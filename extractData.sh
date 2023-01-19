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
function filter_rib_entries() {
  bgpscanner -p "$1$" "$2" >>"$3"
}

ASNS=(
  "57976"
  "6507"
  "46555"
  "395856"
)

# For each compressed file in the data folder...
# Filter the RIB entries for every ASN in the ASNS array
for asn in "${ASNS[@]}"; do
  echo "Filtering from SP2.rib.20221122.${1}00.bz2 for $asn"

  filter_rib_entries "$asn" "./SP2_rib_22-11-22/SP2.rib.20221122.${1}00.bz2" "./data/AS$asn/AS$asn.${1}00.output.txt"
done

# ${1} = Hours
