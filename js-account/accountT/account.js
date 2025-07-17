class Accounter{
  constructor(name) {
    this.name = name;
  }

  init() {
    this.accounts = [];
    this.accounts.push(new Account('예금', 100000));
    this.accounts.push(new Account('예금', 100000));
    this.accounts.push(new Account('적금', 100000));
    return this;
  }

}

class Account {
  constructor(type, balance) {
    this.balance = balance;
    this.type = type;
  }
}