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
  eval '$(bgpscanner -p "$1$" $2 > $3)'
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
  filebasename=$(basename "${1}")

  echo "Filtering from $filebasename for $asn"

  filter_rib_entries "$asn" "./week/SP2_rib_22-11-${1}/SP2.rib.202211${1}.${2}00.bz2" "./data/week/AS$asn/SP_RIB_22-11-${1}/AS$asn.SP2.rib.202211${1}.${2}00.output.txt"
done

# ${1} = Days
# ${2} = Hours
