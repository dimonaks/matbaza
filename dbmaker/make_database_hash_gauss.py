#!/usr/bin/python3
from __future__ import division, unicode_literals, absolute_import, print_function
import sys, glob, os, json, pickle
from siman.small_functions import makedir
from siman.classes import CalculationVasp 
from pymatgen.io.gaussian import GaussianOutput
"""
NAME
    make_database_hash.py - serialize all found .out Gaussian files into .pickle

SYNOPSIS
    make_database_hash.py path_to_database

DESCRIPTION

    Walk through path_to_database, read VASP outcars in Calculation objects and serialize them
    for futher fast access in pickle files.
    Save dictionary hash_dict.json with paths for accessing them later

REQUIRE
        numpy, siman

AUTHOR
        Aksyonov Dmitry, Skoltech, Moscow

"""

__author__ = "Aksyonov Dmitry"
__copyright__ = "Copyright 2020, Skoltech"
__version__ = "2020.2"
__maintainer__ = "Aksyonov Dmitry"
__email__ = "dimonaks@gmail.com"
__status__ = "alpha"
__date__ = ""



def serialize(cl, filename):
    """
    save as pickle object, return path
    """
    file = filename+'.pickle'
    makedir(file)
    with open(file, 'wb') as f:
        pickle.dump(cl, f, 2)
    return file


path2database = sys.argv[1]


os.chdir(path2database)

if 1:
    walk = os.walk(path2database)
    materials = next(walk)[1]
    # print(materials)
    hash_dict = {}
    for mat in walk:
        for outcar in mat[2]:
            if '.out' in outcar:
                mat_folder = os.path.relpath(mat[0], path2database)
                # print(mat_folder)

                iid = outcar.replace('.out', '')

                pickle_file = os.path.join(mat_folder, 'bin', iid)
                if not os.path.isfile(pickle_file+'.pickle'):
                  try:
                    cl = GaussianOutput(os.path.join(mat_folder, outcar ) )
                    print('Gauss file succesfully read')
                  except:
                    print('Gauss file is broken, skipping', os.path.join(mat_folder, outcar ))
                    continue 
                  # cl.read_results()
                  # material = os.path.basename(mat_folder)
                  # print(mat_folder, material)
                  material = mat_folder.split('/')[0]
                  # print(mat_folder.split('/')[0])
                  cl.name = material

                  print(pickle_file)
                  pickle_file = serialize(cl, os.path.join(mat_folder, 'bin', iid) )
                else:
                  print('pickle file', pickle_file, 'exist')
                # concentr = outcar.split('_')[0]
                # hash_dict[material+'_'+iid] = pickle_file
                hash_dict[pickle_file] = pickle_file
    # print(hash_dict)

    with open('hash_dict.json', 'w') as fp:
        json.dump(hash_dict, fp, indent=4)

