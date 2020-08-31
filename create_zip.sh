#!/bin/bash
rm -rf trumpit_release.zip
mkdir trumpit_release
cp -p *.json trumpit_release
cp -p *.js trumpit_release
cp -p *.png trumpit_release
cp -pr data trumpit_release
cp -pr images trumpit_release
zip -r trumpit_release.zip trumpit_release
rm -rf trumpit_release
