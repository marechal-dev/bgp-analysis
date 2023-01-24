#!/usr/bin/env bash

set -Eeo pipefail

trap 'echo ERROR AT: "${BASH_SOURCE}:${LINENO}:${FUNCNAME:-}"' ERR

# Is BGPScanner there?
if ! which bgpscanner; then
  echo "bgpscanner not found! Exiting..."
  exit 1
fi

# For each compressed file in the data folder...
# Filter the RIB entries for every ASN in the ASNS array
echo "Filtering from SP_rib_2022-10-${2}_${3}00.bz2 for AS${1}"

bgpscanner -p "${1}"$ ./week/SP_rib_2022-10-"${2}"/SP_rib_2022-10-"${2}"_"${3}"00.bz2 >>./data/week/SP_rib_2022-10-"${2}"/AS"${1}"_SP_rib_2022-10-"${2}"_"${3}"00.output.txt

# ${1} = ASNs
# ${2} = Days
# ${3} = Days Hours
