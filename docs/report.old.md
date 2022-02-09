#### Main

Il Main è il corpo principale del DATA-PATH che permette di collegare gli altri componenti con l'aggiunta di:

- `2` Registri a 8 bit.

- `4` Multiplexer a 2 ingressi a 8 bit.

Il circuito prende in input il valore del *pH* solo quando abbiamo la combinazione `INIZIO_OPERAZIONE = 1` e `RESET = 0`, mentre se abbiamo `INIZIO_OPERAZIONE = 0` e `RESET = 0` prende il valore risultante dal multiplexer che seleziona fra il valore del registro e il risultato del Modifier, se invece abbiamo `RESET = 1` il circuito si resetta. Dopo aver preso il valore in input e averlo salvato in un registro, il circuito lo passa al modifier che in base al `TIPO_PH` sceglie se prendere il risultato della somma oppure quello della sottrazione, dopodiché il risultato viene filtrato da un multiplexer che in base a `STOP_OPERAZIONE` sceglie se tenere il valore del registo oppure aggiornarlo. L'uscita del multiplexer si dirama per andare dal Neutral che effettua il controllo e restituisce `CONTROLLO_NEUTRO` mentre l'altra diramazione entra nel multiplexer di `INIZIO_OPERAZIONE`.

L'uscita del circuito è collocata tra l'uscita del multiplexer del reset e l'ingresso del registro, essa è filtrata da un multiplexer che in base al valore di `STOP_OPERAZIONE` se vale `0` l'uscita è `0`, invece se vale `1` l'uscita è quella del multiplexer del reset.

![DATA-PATH](./img/DATA-PATH.jpg)

## Statistiche del circuito

Le statistiche del circuito prima dell'ottimizzazione per area sono:

```js

```

Le statistiche dell'FSMD dopo l'ottimizzazione sono:

```js
FSMD            pi=10   po=20   nodes= 55       latches=20
lits(sop)= 295
```

Le statistiche del circuito prima dell'ottimizzazione per area sono:
<!-- SCREEN STATISTICHE -S->

Per minimizzare la **FSM** i comandi da eseguire sono:

```sis
state_minimize stamina
state_assign jedi
source script.rugged
source script.rugged
source script.rugged
```

## Numero di gate e ritardo

Il numero di gate del circuito è <!-- NUMERO GATE-D->.

## La descrizione delle scelte progettuali

Durante l'implementazione del progetto abbiamo fatto le seguenti scelte progettuali:

1. Per controllare se il *pH* è acido oppure basico sfruttiamo il bit più significativo se esso è a 0 allora è acido se è a 1 allora è basico, però questo comprenderebbe che anche i valori neutri vengono assegnati a uno dei due tipi. Per risolvere questo problema abbiamo messo un controllore di neutralità nel DATA-PATH in modo tale che il DATA-PATH comunichi alla FSM di cambiare stato da ***Acido*** oppure ***Basico*** a ***Neutro***.

1. Per controllare l'errore abbiamo aggiunto un componente al DATA-PATH che restituisce uno se e solo se è presente un errore (pH > 14) in questo modo la FSM cambia stato da ***Reset*** a ***Errore***.

1. Se l'utente dallo stato di ***Errore*** oppure ***Neutro*** non inserisce **RST** a *1* la FSM rimane sullo stato in cui si trova.

1. Per semplificare la scrittura e la lettura dei componenti in formato `blif` abbiamo suddiviso il DATA-PATH in più pezzi (`error.blif`, `modifier.blif`, `neutral.blif`, `counter.blif`) che poi abbiamo unito utilizzando i `subckt` e i `search`.

1. Abbiamo aggiunto un registro per TIPO_PH essendo che senza di esso si andrebbe a creare un ciclo.

-->
