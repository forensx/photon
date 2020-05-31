import xarray as xr
import pandas as pd
import numpy as np
import datetime
from netCDF4 import Dataset
import matplotlib.pyplot as plt
import fiona
from shapely.geometry import Point, shape
import shapefile
from statistics import mean
import os
import h5py
import gdal, os
import json
import re
from geojson import Feature, FeatureCollection, Point


all_df = pd.DataFrame(columns = ['lat', 'lon', 'dnb', 'time'])

for filename in os.listdir('../data/light/'):

    datestring = re.findall('\d{7}', filename)[0]
    time = datetime.datetime.strptime(datestring, "%Y%j").strftime("%Y-%m-%d %H:%M:%S")

    h5file = h5py.File('../data/light/'+filename, 'r')
    group = h5file.get('HDFEOS/GRIDS/VNP_Grid_DNB/Data Fields')

    dnb = group.get('DNB_At_Sensor_Radiance_500m')

    arr = dnb[()]

    layer = gdal.Open('../data/light/' + filename, gdal.GA_ReadOnly)
    sublayer = layer.GetSubDatasets()[4][0]
    rlayer = gdal.Open(sublayer, gdal.GA_ReadOnly)

    westboundcoord = int(rlayer.GetMetadata_Dict()["HDFEOS_GRIDS_VNP_Grid_DNB_WestBoundingCoord"])
    eastboundcoord = int(rlayer.GetMetadata_Dict()["HDFEOS_GRIDS_VNP_Grid_DNB_EastBoundingCoord"])
    northboundcoord = int(rlayer.GetMetadata_Dict()["HDFEOS_GRIDS_VNP_Grid_DNB_NorthBoundingCoord"])
    southboundcoord = int(rlayer.GetMetadata_Dict()["HDFEOS_GRIDS_VNP_Grid_DNB_SouthBoundingCoord"])

    minLon, maxLon, maxLat, minLat = westboundcoord, eastboundcoord, northboundcoord, southboundcoord

    def latconvert(x):
        val = round(maxLat - ((x + 0.1) * 0.004168), 4)
        return val

    def lonconvert(x):
        val = round(minLon + ((x + 0.1) * 0.004168), 4)
        return val

    lats = []
    lons = []

    for element in range(2400):
        lats.append(latconvert(element))
        lons.append(lonconvert(element))


    times = [time for element in range(5760000)]

    latitude = np.array(lats)
    longitude = np.array(lons)

    df = pd.DataFrame(arr)
    df = df.set_index(latitude)
    df = df.transpose()
    df = df.set_index(longitude)
    df = df.transpose()
    df = df.stack()
    df = df.reset_index()
    df['time'] = times
    df.columns = ['lat', 'lon', 'dnb', 'time']
    df = df.loc[(df['dnb'] != 65535) & (df['dnb'] != 0)]
    df = df.loc[((df['lat'] <= 41.423734) & (df['lat'] >= 39.7)) & ((df['lon'] <= -71.856214) & (df['lon'] >= -75.410225))]
    df = df.loc[df['dnb'] >= 20]
    #df_alternate = df.iloc[::2]
    #df_alternate = df_alternate.iloc[::2].copy()
    print(df)
    all_df = all_df.append(df)


# normalized_dnb = [(element - all_df_avg)/(max_df - min_df) for element in all_df['dnb']]
# normalized_dnb = [round(num, 4) for num in normalized_dnb]
# print(normalized_dnb)
# all_df['dnb'] = normalized_dnb

all_df.to_csv('../data/light_csv/all_csv.csv', index = False)



    #print(df_alternate)

    # data =  []

    # {position: [-122.45, 37.8], color: [255, 0, 0], radius: 100}

    # for row in df.itertuples(index = False):
    #     new = {
    #         'position': [row[1], row[0], row[2], row[3]]
    #     }
    #     data.append(new)
    
    # with open('pleasework.json', 'w') as f:
    #     json.dump(data, f)

    # print("done with 1")

    #df.to_csv('../data/light_csv/rawdropbelow10/' + os.path.splitext(filename)[0] + '.csv', index = False)
