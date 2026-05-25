require("../test-setup");
const { describe, it, expect } = require("vitest");
const User = require("../../src/models/User");

describe("User Model", () => {
  it("should create a user", async () => {
    const user = await User.create({
      username: "testuser",
      email: "test@test.com",
      profileImage: "http://image.com",
    });

    expect(user).toBeDefined();
    expect(user.username).toBe("testuser");
    expect(user.email).toBe("test@test.com");
    expect(user.profileImage).toBe("http://image.com");
  });

  // TODO: Test that email must be unique
  it("should not allow duplicate username", async () => {
    await User.create({
      username: "sameuser",
      email: "a@test.com",
      profileImage: "http://image.com",
    });

    await expect(
      User.create({
        username: "sameuser",
        email: "b@test.com",
        profileImage: "http://image.com",
      }),
    ).rejects.toThrow(/duplicate key/);
  }); // TODO: Test that email format is validated
  // TODO: Test that profileImage is a valid URL
});
