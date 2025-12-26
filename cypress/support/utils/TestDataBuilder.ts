/**
 * Data Builder/Factory for generating test data
 * Uses faker for realistic test data generation
 */

import { faker } from '@faker-js/faker';

export class TestDataBuilder {
  static generateEmployee() {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      middleName: faker.person.middleName(),
      employeeId: faker.string.numeric(4),
      email: faker.internet.email(),
      phone: faker.phone.number(),
    };
  }

  static generateUser() {
    return {
      username: faker.internet.userName(),
      password: faker.internet.password({ length: 12 }),
      email: faker.internet.email(),
    };
  }

  static generateLeaveRequest() {
    const fromDate = faker.date.future();
    const toDate = new Date(fromDate);
    toDate.setDate(toDate.getDate() + faker.number.int({ min: 1, max: 5 }));

    return {
      fromDate: this.formatDate(fromDate),
      toDate: this.formatDate(toDate),
      comments: faker.lorem.sentence(),
    };
  }

  static generateJobTitle() {
    return {
      title: faker.person.jobTitle(),
      description: faker.lorem.paragraph(),
    };
  }

  static formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  static getCredentials() {
    return {
      admin: {
        username: Cypress.env('username') || 'Admin',
        password: Cypress.env('password') || 'admin123',
      },
    };
  }
}
