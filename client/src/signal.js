export class Signal {
  constructor() {
    this.listners = [];
  }

  connect(listner) {
    this.listners.push(listner);
    console.log(listner);
  }

  emit(data) {
    for (let listner of this.listners) {
      console.log(listner);
      listner(data);
    }
  }
}
