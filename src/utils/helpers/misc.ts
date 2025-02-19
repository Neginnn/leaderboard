export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const formatMoney = (value: number) => {
  if (value) {
    const formatter = new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      signDisplay: 'never' // positive/negative sign
    });

    const formatterArray = formatter.format(value).toString().split('.');
    const dollarValue = formatterArray[0];

    // http://linterrors.com/js/missing-radix-parameter
    if (parseInt(formatterArray[1], 10) > 0) {
      const centValue = `.${formatterArray[1]}`;

      return { dollars: dollarValue, cents: centValue };
    }

    return { dollars: dollarValue };
  }
};

export const isFr = (locale: string) => {
  return locale !== 'en-CA';
};
