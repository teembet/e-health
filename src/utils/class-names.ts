const className = (classes: any): string => {
  return Object
      .entries(classes)
      .filter(entry => entry[1])
      .map(entry => entry[0])
      .join(' ');
};

export default className;
