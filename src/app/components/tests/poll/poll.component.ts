import { Component, OnInit } from "@angular/core";
import { CdkDragDrop } from "@angular/cdk/drag-drop";

@Component({
  selector: "app-poll",
  templateUrl: "./poll.component.html",
  styleUrls: ["./poll.component.css"],
})
export class PollComponent implements OnInit {
  categories = {
    names: [
      "Elon Musk",
      "Abraham Lincoln",
      "Barack Obama",
      "Taylor Swift",
      "Mc Lovin",
      "Torrente",
      "Che Guevara",
      "Donald Trump",
      "Albert Einstein",
      "Napoleon Bonaparte",
      "Cristiano Ronaldo",
      "Jackie Chan",
      "Lebron James",
      "Leonardo da Vinci",
      "Nikola Tesla",
      "Oprah Winfrey",
      "Pedro Sánchez",
      "Mariano Rajoy",
      "Osama Bin Laden",
      "Melendi",
    ],
    actions: [
      "eats",
      "fights",
      "steals",
      "hugs",
      "juggles",
      "kisses",
      "sleeps with",
      "has in his bed",
      "throws",
      "wants to buy",
      "paints",
      "invented",
      "destroys",
      "sings to",
      "is in love with",
      "is afraid of",
      "spies on",
      "cooks",
      "challenges to a duel",
      "dances with",
    ],
    objects: [
      "an inflatable doll",
      "a flying cat",
      "a talking banana",
      "a giant pizza",
      "a sweaty sock",
      "12 MacBooks",
      "a human head",
      "a haunted sock",
      "a magical potato",
      "an invisible chair",
      "a dead body",
      "a big cucumber",
      "a picture of Yao Ming",
      "a screaming watermelon",
      "a robot penguin",
      "a time-traveling toaster",
      "vegan food",
      "a shoe filled with soup",
      "a cursed doll",
      "a radioactive hamster",
    ],
  };

  options = [];
  votes = [];

  constructor() {}
  ngOnInit(): void {
    this.randomizeData();
  }

  vote(event: CdkDragDrop<any[]>) {
    if (this.votes.length === 0) {
      const option = event.previousContainer.data[event.previousIndex];
      const votedOption = this.options.find((opt) => opt.name === option.name);
      if (votedOption) {
        votedOption.votes++;
        votedOption.voted = true;
        this.votes.push(option);

        //show X in box and hide envelopes
        setTimeout(() => {
          document.querySelector(".vote-box")?.classList.add("voted");
          document.querySelector(".options-list")?.classList.add("voted");
        }, 100);

        //sort to show ordered data in template
        this.sortOptions();
      }

      console.log(this.options);
    }
  }

  clearVoted() {
    //hide X in box and hide envelopes
    setTimeout(() => {
      document.querySelector(".vote-box")?.classList.remove("voted");
      document.querySelector(".options-list")?.classList.remove("voted");
    }, 100);
  }

  resetVotes() {
    this.options.forEach((element) => {
      element.votes = 0;
      element.voted = false;
    });
    this.votes = [];
    this.clearVoted();
  }

  randomizeData() {
    this.votes = [];
    this.options = [];
    let optionsNumber = 2 + Math.floor(Math.random() * 18);
    console.log(optionsNumber);

    for (let i = 0; i < optionsNumber; i++) {
      const randomName = this.getRandomItem(this.categories.names);
      const randomAction = this.getRandomItem(this.categories.actions);
      const randomObject = this.getRandomItem(this.categories.objects);

      const funnyPhrase = `${randomName} ${randomAction} ${randomObject}`;

      this.options.push({
        name: funnyPhrase,
        votes: Math.floor(Math.random() * 10000),
        voted: false,
      });
    }

    this.sortOptions();
    this.clearVoted();
    console.log(this.options);
  }

  getRandomItem(randomItemsarray: string[]): string {
    return randomItemsarray[
      Math.floor(Math.random() * randomItemsarray.length)
    ];
  }

  sortOptions() {
    this.options.sort((a, b) => b.votes - a.votes);
  }

  getPodiumClass(index: number): string {
    if (this.options[index].votes === 0) {
      return "no-podium"; // No podium if the option has 0 votes
    }

    if (index === 0) {
      return "gold";
    } else if (index === 1) {
      return "silver";
    } else if (index === 2) {
      return "bronze";
    } else {
      return "no-podium";
    }
  }
}
