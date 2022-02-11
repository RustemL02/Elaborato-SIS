# STATI

```sh
# FSM
RST START PH[8] ERRORE NEUTRO

FINE_OPERAZIONE ERRORE_SENSORE VALVOLA_ACIDO VALVOLA_BASICO RESET INIZIO_OPERAZIONE TIPO_PH
```


## Reset

```sh
00 -------- --    Reset Reset     0000 10-
1- -------- --    Reset Reset     0000 10-

01 -------- 1-    Reset Errore    0100 01-

01 00------ 00    Reset Acido     0001 010
01 010----- 00    Reset Acido     0001 010
01 0110---- 00    Reset Acido     0001 010

01 0111---- 01    Reset Neutro    1000 01-
01 10000000 01    Reset Neutro    1000 01-

01 1000---1 00    Reset Basico    0010 011
01 1000--1- 00    Reset Basico    0010 011
01 1000-1-- 00    Reset Basico    0010 011
01 10001--- 00    Reset Basico    0010 011
01 1001---- 00    Reset Basico    0010 011
01 101----- 00    Reset Basico    0010 011
01 110----- 00    Reset Basico    0010 011
01 11100000 00    Reset Basico    0010 011
```

## Errore

```sh
0- -------- --    Errore Errore   0100 00-
1- -------- --    Errore Reset    0000 10-
```

## Acido

```sh
0- -------- -0     Acido  Acido   0001 000
0- -------- -1     Acido  Neutro  1000 000
1- -------- --     Acido  Reset   0000 10-
```

## Basico

```sh
0- -------- -0     Basico Basico  0010 001
0- -------- -1     Basico Neutro  1000 001
1- -------- --     Basico Reset   0000 10-
```

## Neutro

```sh
0- -------- --     Neutro Neutro  1000 00-
1- -------- --     Neutro Reset   0000 10-
```
