#!/usr/bin/env bash

set -Eeo pipefail

trap 'echo ERROR AT: "${BASH_SOURCE}:${LINENO}:${FUNCNAME:-}"' ERR

# Is BGPScanner there?
if ! which bgpscanner; then
  echo "bgpscanner not found! Exiting..."
  exit 1
fi

# Using BGPScanner, filter the ribs entries then append to a pre-existing file
# This function takes three argument:
# 1. The ASN
# 2. The RIB file path
# 2. The output file path
# function filter_rib_entries() {
#   bgpscanner -p "$1$" "$2" >>"$3"
# }

# In order:
# 0. Riot Games
# 1. Take-Two Interactive
# 2. 2K Games
# 4. Blizzard Entertainment
# ASNS=(
#   "6507"
#   "46555"
#   "395856"
#   "57976"
# )

# For each compressed file in the data folder...
# Filter the RIB entries for every ASN in the ASNS array
echo "Filtering from SP2.rib.20221113.${2}00.bz2 for AS${1}"

bgpscanner -p "${1}"$ ./SP2_rib_2022-10-02/rib.20221002."${2}"00.bz2 ./data/AS"${1}"/AS"${1}"."${2}"00.output.txt

# ${1} = ASNs
# ${2} = Hours
