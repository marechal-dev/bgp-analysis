#!/usr/bin/env bash

set -Eeo pipefail

trap 'echo ERROR AT: "${BASH_SOURCE}:${LINENO}:${FUNCNAME:-}"' ERR

wget -O week/SP_rib_2022-10-"${1}"/SP_rib_2022-10-"${1}"_"${2}"00.bz2 http://archive.routeviews.org/route-views.saopaulo/bgpdata/2022.10/RIBS/rib.202210"${1}"."${2}"00.bz2
