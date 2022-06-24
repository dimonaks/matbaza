#!/usr/bin/python3
"""
NAME
    read_calculation.py

SYNOPSIS


DESCRIPTION

Gets two filenames of pickle objects from JS script.
The files are deserialized and the average intercalation potential is calculated

REQUIRE
        numpy, siman

AUTHOR
        Aksyonov Dmitry, Skoltech, Moscow

"""

import cgitb, cgi 
cgitb.enable()
print('Content-type: text/html\n\n')

import sys
from siman.classes import CalculationVasp
from simna.analysis import calc_redox

db_path = '/home/aksenov/www/CES/'

form = cgi.FieldStorage() 

# Get data from fields
string = form.getvalue('param')
string = string.replace('"', '')
files = string.split()


cl1 = CalculationVasp().deserialize(db_path+files[0])
cl2 = CalculationVasp().deserialize(db_path+files[1])

# output = cl1.energy_sigma0
output = calc_redox(cl1, cl2)['redox_pot']

# print(output, 'V')


# sys.stdout.write(str(output) )
# sys.stdout.flush()
sys.exit(0)



