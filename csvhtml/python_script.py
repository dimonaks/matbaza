#!/usr/bin/python3
import sys
sys.path.extend(['/home/aksenov/www/siman'])
from analysis import calc_redox
from classes import CalculationVasp

db_path = '/home/aksenov/Data/CEStorage/'

file1 = sys.argv[1]


cl1 = CalculationVasp().deserialize(db_path+file1)

print(cl1.energy_sigma0)
output = cl1.energy_sigma0
# return cl1.energy_sigma0

sys.stdout.write(output)
sys.stdout.flush()
sys.exit(0)
