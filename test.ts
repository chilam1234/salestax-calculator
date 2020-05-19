enum TaxLocations {
  CA = 0.0975,
  NY = 0.0875,
}

enum Categories {
  food = 'food',
  clothing = 'clothing',
  other = 'others',
}

interface Product {
  name: string;
  category: Categories;
  price: number;
}

interface CartRecord {
  product: Product;
  quantity: number;
}

class TaxCalcaulators {

  public static printReceipt(locations: TaxLocations, records: CartRecord[]): void {
    console.table(this.listProducts(records), ["name", "price", "quantity"]);
    console.table({ subtotal: this.getSubtoal(records) });
    console.table({ Tax: this.getTax(locations, records) });
    console.table({ Total: this.getTotal(locations, records) });
    return;
  }

  private static getTax(location: TaxLocations, records: CartRecord[]): number {
    let result: number = 0;
    for (const record of records) {
      if (location === TaxLocations.CA && record.product.category === Categories.food) {
        continue;
      }
      if (location === TaxLocations.NY && (record.product.category === Categories.food || record.product.category === Categories.clothing)) {
        continue;
      }
      result += record.product.price * record.quantity * location;
    }
    return this.round(result);
  }

  private static getSubtoal(records: CartRecord[]): number {
    return +(records.reduce((result: number, record) => result + record.quantity * record.product.price, 0)).toFixed(2);
  }

  private static round(num: number): number {
    return Math.ceil(num * 20) / 20.0;
  }

  private static getTotal(location: TaxLocations, records: CartRecord[]): number {
    return +(this.getSubtoal(records) + this.getTax(location, records)).toFixed(2);
  }

  private static listProducts(records: CartRecord[]): any[] {
    return records.map(record => {
      return {
        ...record.product,
        quantity: record.quantity
      };
    }
    );
  }

}

const book: Product = {
  price: 17.99,
  name: 'book',
  category: Categories.other,
};

const potatoChips: Product = {
  price: 3.99,
  name: 'potato chips',
  category: Categories.food,
}

const pencils: Product = {
  price: 2.99,
  name: 'pencil',
  category: Categories.other,
}

const shirts: Product = {
  price: 29.99,
  name: 'shirt',
  category: Categories.clothing,
}

console.log("------Use Case 1------")
// Use case 1
TaxCalcaulators.printReceipt(TaxLocations.CA, [
  {
    product: book,
    quantity: 1,
  },
  {
    product: potatoChips,
    quantity: 1,
  }
]);
console.log("\n ------End of Use Case 1------")

// Use case 2
console.log("\n------Use Case 2------")

TaxCalcaulators.printReceipt(TaxLocations.NY, [
  {
    product: book,
    quantity: 1,
  },
  {
    product: pencils,
    quantity: 3,
  }
]);
console.log("\n ------End of Use Case 2------")

// Use case 3
console.log("\n------Use Case 3------")

TaxCalcaulators.printReceipt(TaxLocations.NY, [
  {
    product: pencils,
    quantity: 2,
  },
  {
    product: shirts,
    quantity: 1,
  }
]);
console.log("\n ------End of Use Case 3------")


