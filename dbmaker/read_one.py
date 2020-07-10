#!/usr/bin/python3
from __future__ import division, unicode_literals, absolute_import, print_function
import sys, glob, os, json, pickle
from siman.small_functions import makedir
from siman.classes import CalculationVasp 
from pymatgen.io.gaussian import GaussianOutput
"""
NAME
    read_one.py - 

SYNOPSIS
    read_one.py path2file code_type

DESCRIPTION



REQUIRE
        numpy, siman, pymatgen

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


path2file = sys.argv[1]
code_type = sys.argv[2]



if 1:
    cl = GaussianOutput(path2file)
    print('Gauss file succesfully read', cl.final_structure.formula, cl.final_energy)
