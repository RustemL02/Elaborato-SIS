# Progetto FSMD

Progetto di un circuito di tipo *FSMD* che, dato il pH di una soluzione, ne porti il valore alla neutralità.

## Interfaccia del circuito

Ingressi:

- `RST` (1 bit)

    Il circuito deve tornare allo stato iniziale a partire da un qualsiasi altro non appena riceve il segnale di *rest* uguale a `1`. Inoltre tutte le uscite tornano a `0`.

- `START` (1 bit)

    Il circuito esce dallo stato iniziale solamente quando riceve il segnale di *inizio* uguale ad `1` ed il *pH* iniziale **nello stesso ciclo di clock**.

- `PH` (8 bit)

    Il circuito riceve il segnale *pH*, **codificato in virgola fissa** con `4` bit dedicati alla parte intera (intervallo `[0, 14]`) e i restanti per la parte decimale. In seguito alla comprensione del valore, il sistema decide in quale stato porsi.

Uscite:

- `FINE_OPERAZIONE` (1 bit)

    Questo segnale comunica che la soluzione ha finalmente raggiunto la neutralità, in altre parole diviene uguale ad `1` solamente quando il valore del *pH* è compreso nell'intervallo `[7, 8]`.

- `ERRORE_SENSORE` (1 bit)

    Il segnale indica che il sistema ha ricevuto in ingresso un *pH* non valido, cioè diviene uguale ad `1` solamente quando, insieme al segnale di *inizio*, viene inserito un *pH* `> 14`.

- `VALVOLA_ACIDO` (1 bit)

    Il segnale comunica che è necessario correggere il *pH* della soluzione fornendo ulteriore basicità, diviene uguale ad `1` prettamente quando il circuito è stato di *basico*.

- `VALVOLA_BASICO` (1 bit)

    Il segnale comunica che è necessario correggere il *pH* della soluzione fornendo ulteriore acidità, diviene uguale ad `1` prettamente quando il circuito è stato di *acido*.

- `PH_FINALE` (8 bit)

    Questo segnale rappresenta il valore esatto del *pH* quando il sistema riconosce di aver
    completato le operazioni. Possiede la **medesima codifica** del *pH* in ingresso.

- `NCLK` (8 bit)

    Questo segnale rappresenta il numero di cicli impiegati per raggiungere la neutralità, viene **codificato in modulo**.

## Finite State Machine (FSM)

Stati della FSM:

- `Reset`, stato iniziale del circuito
- `Errore`, stato raggiunto in caso di pH invalido
- `Acido`, stato raggiunto in caso di pH acido
- `Basico`, stato raggiunto in caso di pH basico
- `Neutro`, stato raggiunto dopo che il pH ha raggiunto la neutralità

<!-- Inserisci STG -->

<!-- Inserisci STT -->

## Datapath

<!-- Inserisci Datapath -->
