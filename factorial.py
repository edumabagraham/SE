#---------------------Factorial with recursion-----------------------------#
def factorial(n):
    return 1 if n <=1 else n* factorial(n-1)


#-----------------Factorial with Tail recursion/call-----------------------#
def tcoFactorial(n, a = 1):
    return a if n == 1 or n ==0 else tcoFactorial(n-1, a * n)
