#!/usr/bin/scl enable rh-python36 -- python3


"""
NAME
    write_xyz.py

SYNOPSIS


DESCRIPTION

Gets name of pickle object and path to database from JS script.
The file is deserialized and its crystal structure is written as xyz file. 

REQUIRE
        numpy, siman

AUTHOR
        Aksyonov Dmitry, Skoltech, Moscow

"""


if 1:
    import cgitb, cgi 
    cgitb.enable()
    print('Content-type: text/html\n\n')

import sys, os, pickle
from pymatgen.io.gaussian import GaussianOutput
import siman
from siman.classes import CalculationVasp, Structure
sys.modules['classes'] = siman.classes

def deserialize(filename, encoding = ''):
    
    # import chardet  
    # with open(filename, 'rb') as f:
    #     result = chardet.detect(f.read(10000))  
    # print(result)
    # sys.exit()
    with open(filename, 'rb') as f:
        if encoding:
            cl = pickle.load(f, encoding = encoding)
        else:
            cl = pickle.load(f, )
    # printlog('Calculation object succesfully read from ', filename)
    return cl

if 1:
    form = cgi.FieldStorage() 
    # Get data from fields
    string = form.getvalue('param')
    string = string.replace('"', '')
    args = string.split()

    os.chdir('..') # go one level up from cgi-bin to matbaza
    print('Current directory is',os.getcwd())
    print('Youve chosen file',args[0])
    print('db_path is', args[-1]) # the path to database is given as a last argument
    print('\n\n')
    filename = args[-1]+'/'+args[0]

# filename = '/home/aksenov/molec-Pa_CAM-B3LYPp2p.pickle'

obj = deserialize(filename)

if isinstance(obj, GaussianOutput):

    # obj.final_structure

    st = Structure()

    st = st.update_from_pymatgen(obj.final_structure)

elif isinstance(obj, CalculationVasp):
# print('Types are ',type(cl1), type(cl1) is type(CalculationVasp()),  type(cl1))
    st = obj.end


xyzfile = st.write_xyz(filename = 'current', include_vectors = 0)[0]

sys.stdout.write('load '+xyzfile)

sys.stdout.flush()
sys.exit(0)
