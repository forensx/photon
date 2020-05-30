FROM continuumio/miniconda:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

RUN conda install -c anaconda python=3.8 && conda update --all && conda install -c conda-forge cartopy