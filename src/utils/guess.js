export default function(guessedDefinition) {
  const { definitions } = this.dictionary[this.currentWord];

  if(definitions.some(({ definition }) => definition === guessedDefinition)){
    this.points++;
    this.$refs.points.style.background = '#14f396';
    setTimeout(() => {
      this.$refs.points.style.background = 'initial';
    }, 300);

    this.generateDictionary();
  } else {
    this.choices.forEach(choice => {
      if(choice.word === this.currentWord){
        this.info = {
          show: true,
          title: `${choice.word} (${choice.partOfSpeech}) means:`,
          text: choice.definition
        };
      }
    });
  }
}
