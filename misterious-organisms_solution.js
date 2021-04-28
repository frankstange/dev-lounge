// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

/*
pAequorFactoryis a factory function to generate organism objects
Parameters:
  number = unique species number
  dnaBase = array of 15 DNA bases
  mutate() = mutated DNA in one position
  compareDNA() = compares the DNA witch another pAequor object
  willLikelySurvive() = Determines the survival probability of the organism.
 */

//Step 3
const pAequorFactory = (number, dnaBase) => {
  return {
    specinemNum: number,

    dna: dnaBase,

    //Step 4
    mutate: () => {
      //position of dnaBase mutation
      const dnaBaseChange = Math.floor(Math.random() * 15);

      //original value of this position
      const dnaOriginalValue = dnaBase[dnaBaseChange];

      //generate new different dna value
      let dnaMutantValue = '';
      do {
        dnaMutantValue = returnRandBase();
      } while (dnaOriginalValue === dnaMutantValue);

      //implement different dna value in dna strand
      let dnaMutantBase = dnaBase;
      dnaMutantBase[dnaBaseChange] = dnaMutantValue;

      return dnaMutantBase;
    },

    //Step 5
    compareDNA: (testSpecinem) => {
      //count how many dna Bases are equal
      let equalCount = 0;

      //compare each Base and count if equal
      for (let i = 0; i < 15; i++) {
        if (dnaBase[i] === testSpecinem.dna[i]) {
          equalCount++;
        }
      }

      //how many percent are equal
      console.log(
        'specinem ' +
          number +
          ' and specinem ' +
          testSpecinem.specinemNum +
          ' have ' +
          Math.floor((100 / 15) * equalCount) +
          ' % DNA in common'
      );
    },

    //Step 6
    willLikelySurvive: () => {
      let survivalCount = 0;
      //count if dna is C or G, proof each dna element
      dnaBase.forEach((element) => {
        if ((element === 'C') | (element === 'G')) {
          survivalCount++;
        }
      });
      // return true if more than 60% of the dna is C or G
      if (survivalCount >= 9) {
        return true;
      } else {
        return false;
      }
    },
  };
};

//Step 7
//Store 30 viable species.
let paDnaStore = [];
//log how many species were created
let speciesCreatingCount = 0;

for (let i = 1; i <= 30; i++) {
  //generate species
  let speciesGenerator = pAequorFactory(i, mockUpStrand());
  //count each try
  speciesCreatingCount++
  //Check if the species can survive
  if (speciesGenerator.willLikelySurvive()) {
    //if yes store the DNA
    paDnaStore.push(speciesGenerator);
  } else {
    //if not try again
    i--;
  }
}

//test
console.log(`We create ${speciesCreatingCount} species to find 30 with valid DNA!`);
for (let i = 0; i < 30; i++) {
  console.log(
    'Species: ' +
      paDnaStore[i].specinemNum +
      ' can survive: ' +
      paDnaStore[i].willLikelySurvive()
  );
}
