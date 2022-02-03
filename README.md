# SIS Project

SIS project for the *Computer Architecture* course at the ***University of Verona***.

The goal is to design an `FSMD` type circuit which, given a solution, must analyze its pH and finally bring it to neutrality.

## Structure

In the project you will find the report that describes the circuit and also the SIS sources that implement it.

The report is located in the `docs/` directory and is written in *Markdown* format, instead the *PDF* translation is inside `docs/out/`. Finally the sources are located in `source/sis` and some helper scripts in `source/scripts`.

## Usage

The circuit is described in the *SIS* format, so you need to [install the language](sis-source) before.

Then, to simulate the execution of the circuit it is sufficient to launch the commands:

```bash
# Run the SIS executable.
user@host:~$ sis

# Load the file to simulate.
sis> read_blif FSMD.blif

# Test the circuit with some bits.
sis> simulate 0 1 1 1 0 0 1 0 1 1 0 1

.
.
.

# Finish the simulation.
sis> quit
```

## Credits

The authors of the project are:

- [Bottacini Luca](github-nanolf)
- [Lecini Rustem](github-rustem)
- [Roin Giovanni](github-kyllen)

[sis-source]: https://jackhack96.github.io/logic-synthesis/sis.html
[github-nanolf]: https://github.com/Nanolf
[github-rustem]: https://github.com/RustemL02
[github-kyllen]: https://github.com/Kyllen02