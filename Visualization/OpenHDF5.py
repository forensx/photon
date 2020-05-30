import gdal, os

## List input raster files
os.chdir("/mnt/d/SpaceApps/proton/Visualization/Data")
rasterFiles = os.listdir(os.getcwd())
print(rasterFiles)

#Get File Name Prefix
rasterFilePre = rasterFiles[0][:-4]
print(rasterFilePre)

fileExtension = "_BBOX.tif"

## Open HDF file
hdflayer = gdal.Open(rasterFiles[0], gdal.GA_ReadOnly)

#print (hdflayer.GetSubDatasets())

# Open raster layer
#hdflayer.GetSubDatasets()[0][0] - for first layer
#hdflayer.GetSubDatasets()[1][0] - for second layer ...etc
subhdflayer = hdflayer.GetSubDatasets()[0][0]
rlayer = gdal.Open(subhdflayer, gdal.GA_ReadOnly)
#outputName = rlayer.GetMetadata_Dict()['long_name']

#Subset the Long Name
outputName = subhdflayer[92:]

outputNameNoSpace = outputName.strip().replace(" ","_").replace("/","_")
outputNameFinal = outputNameNoSpace + rasterFilePre + fileExtension
print(outputNameFinal)

outputFolder = "/mnt/d/SpaceApps/proton/Visualization/tiffResults/"

outputRaster = outputFolder + outputNameFinal

#collect bounding box coordinates
#-a_ullr <ulx> <uly> <lrx> <lry>
WestBoundCoord = rlayer.GetMetadata_Dict()["HDFEOS_GRIDS_VNP_Grid_DNB_WestBoundingCoord"]
EastBoundCoord = rlayer.GetMetadata_Dict()["HDFEOS_GRIDS_VNP_Grid_DNB_EastBoundingCoord"]
NorthBoundCoord = rlayer.GetMetadata_Dict()["HDFEOS_GRIDS_VNP_Grid_DNB_NorthBoundingCoord"]
SouthBoundCoord = rlayer.GetMetadata_Dict()["HDFEOS_GRIDS_VNP_Grid_DNB_SouthBoundingCoord"]


EPSG = "-a_srs EPSG:4326" #WGS84

translateOptionText = EPSG+" -a_ullr " + WestBoundCoord + " " + NorthBoundCoord + " " + EastBoundCoord + " " + SouthBoundCoord

translateoptions = gdal.TranslateOptions(gdal.ParseCommandLine(translateOptionText))
gdal.Translate(outputRaster,rlayer, options=translateoptions)
#gdal.Warp(outputRaster,rlayer)

#Display image in QGIS (run it within QGIS python Console) - remove comment to display
#iface.addRasterLayer(outputRaster, outputNameFinal)
