import { shallowMount } from "@vue/test-utils";
import Login from "@/components/Login.vue";

describe("Login.vue", () => {
  it("renders login and password", () => {
    const msg = "test";
    const wrapper = shallowMount(Login, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
