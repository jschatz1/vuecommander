export default class Interface {
  constructor(...args) {
    this.fields = args;
  }

  implementedBy(cls) {
    this.fields.forEach((arg) => {
      if (!cls[arg]) {
        throw new Error(
          `Class ${cls.constructor.name} does not implement method "${arg}"`,
        );
      }
    });
  }
}
