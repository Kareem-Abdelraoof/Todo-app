import CustomLink from './../components/CustomLink';
import CustomInput from './../components/CustomInput';
import CustomButton from './../components/CustomButton';
import CustomTextArea from './../components/CustomTextArea';

export class InputInitializer {
  constructor(data) {
    this.data = [...data];
  }
  setOnChange(onChange) {
    this.data = this.data.map((el) => {
      el.data.input.onChange = onChange;
      return el;
    });
    return this;
  }
  setValue(valueObj) {
    this.data = this.data.map((el) => {
      if (el.data.input.type === 'checkbox') {
        el.data.input.checked = valueObj[el.data.input.name];
      } else {
        el.data.input.value = valueObj[el.data.input.name];
      }
      return el;
    });
    return this;
  }
  getData() {
    return this.data.map((el) => ({
      ...el,
      data: {
        ...el.data,
        input: { ...el.data.input },
        attributes: { ...el.data.attributes },
      },
    }));
  }
}
export class ButtonInitializer {
  constructor(data) {
    this.data = data;
  }

  setText({ nameOfButton, value }) {
    this.data = this.data.map((el) => {
      if (el.data.attributes.name === nameOfButton) {
        el.data.text = value;
        return el;
      }
      return el;
    });
  }

  setAttribute({ nameOfButton, nameOfAttribute, value }) {
    this.data = this.data.map((el) => {
      if (el.data.attributes.name === nameOfButton) {
        el.data.attributes[nameOfAttribute] = value;
        return el;
      }
      return el;
    });
    return this;
  }
  getData() {
    return this.data.map((el) => ({
      ...el,
      data: {
        ...el.data,
        input: { ...el.data.input },
        attributes: { ...el.data.attributes },
      },
    }));
  }
}

export const loginFormInputs = [
  {
    Component: CustomInput,
    data: {
      label: {
        text: 'Email',
        attributes: {
          htmlFor: 'email',
        },
      },
      input: {
        type: 'email',
        id: 'email',
        name: 'email',
        required: true,
      },
      className: 'input-group',
    },
  },
  {
    Component: CustomInput,
    data: {
      label: {
        text: 'Password',
        attributes: {
          htmlFor: 'password',
        },
      },
      input: {
        type: 'password',
        id: 'password',
        name: 'password',
        required: true,
      },
      className: 'input-group',
    },
  },
];

export const loginFormButtons = [
  {
    Component: CustomButton,
    data: {
      text: 'Login',
      attributes: {
        className: 'login-button-primary',
        name: 'login',
      },
    },
  },
  {
    Component: CustomLink,
    data: {
      text: 'Register',
      attributes: {
        to: '/register',
        className: 'login-button-link',
      },
    },
  },
];

export const registerFormInputs = [
  {
    Component: CustomInput,
    data: {
      label: {
        text: 'Username',
        attributes: {
          htmlFor: 'username',
        },
      },
      input: {
        type: 'text',
        id: 'username',
        name: 'username',
        required: true,
      },
      className: 'input-group',
    },
  },
  {
    Component: CustomInput,
    data: {
      label: {
        text: 'Email',
        attributes: {
          htmlFor: 'email',
        },
      },
      input: {
        type: 'email',
        id: 'email',
        name: 'email',
        required: true,
      },
      className: 'input-group',
    },
  },
  {
    Component: CustomInput,
    data: {
      label: {
        text: 'Password',
        attributes: {
          htmlFor: 'password',
        },
      },
      input: {
        type: 'password',
        id: 'password',
        name: 'password',
        required: true,
      },
      className: 'input-group',
    },
  },
];
export const registerFormButtons = [
  {
    Component: CustomButton,
    data: {
      text: 'Register',
      attributes: {
        className: 'register-button-primary',
        name: 'register',
      },
    },
  },
  {
    Component: CustomLink,
    data: {
      text: 'Login',
      attributes: {
        to: '/login',
        className: 'register-button-link',
      },
    },
  },
];

export const profilePasswordFormInputs = [
  {
    Component: CustomInput,
    data: {
      label: {
        text: 'Old Password',
        attributes: {
          htmlFor: 'oldPassword',
        },
      },
      input: {
        type: 'password',
        id: 'oldPassword',
        name: 'oldPassword',
        required: true,
      },
      className: 'input-group',
    },
  },
  {
    Component: CustomInput,
    data: {
      label: {
        text: 'New Password',
        attributes: {
          htmlFor: 'newPassword',
        },
      },
      input: {
        type: 'password',
        id: 'newPassword',
        name: 'newPassword',
        required: true,
      },
      className: 'input-group',
    },
  },
  {
    Component: CustomInput,
    data: {
      label: {
        text: 'Confirm New Password',
        attributes: {
          htmlFor: 'confirmNewPassword',
        },
      },
      input: {
        type: 'password',
        id: 'confirmNewPassword',
        name: 'confirmNewPassword',
        required: true,
      },
      className: 'input-group',
    },
  },
];
export const profilePasswordFormButtons = [
  {
    Component: CustomButton,
    data: {
      text: 'Update Password',
      attributes: {
        className: ' profile-button-primary password-button-primary',
        name: 'update-password',
      },
    },
  },
];
export const profileUpdateFormInputs = [
  {
    Component: CustomInput,
    data: {
      label: {
        text: 'Username',
        attributes: {
          htmlFor: 'username',
        },
      },
      input: {
        type: 'text',
        id: 'username',
        name: 'username',
        required: true,
      },
      className: 'input-group',
    },
  },
  {
    Component: CustomInput,
    data: {
      label: {
        text: 'Email',
        attributes: {
          htmlFor: 'email',
        },
      },
      input: {
        type: 'email',
        id: 'email',
        name: 'email',
        required: true,
      },
      className: 'input-group',
    },
  },
];
export const profileUpdateFormButtons = [
  {
    Component: CustomButton,
    data: {
      text: 'Update Info',
      attributes: {
        className: 'profile-button-primary update-button-primary',
        name: 'update-info',
      },
    },
  },
];

export const todosFormInputs = [
  {
    Component: CustomInput,
    data: {
      label: {
        text: 'Title',
        attributes: {
          htmlFor: 'title',
        },
      },
      input: {
        type: 'text',
        id: 'title',
        name: 'title',
        required: true,
      },
      className: 'input-group',
    },
  },
  {
    Component: CustomTextArea,
    data: {
      label: {
        text: 'Description',
        attributes: {
          htmlFor: 'description',
        },
      },
      input: {
        id: 'description',
        name: 'description',
        required: true,
      },
      className: 'input-group',
    },
  },
  {
    Component: CustomInput,
    data: {
      label: {
        text: 'Completed',
        attributes: {
          htmlFor: 'completed',
        },
      },
      input: {
        type: 'checkbox',
        id: 'completed',
        name: 'completed',
      },
      className: 'checkbox-container',
    },
  },
];
export const todosFormButtons = [
  {
    Component: CustomButton,
    data: {
      text: 'Save Todo',
      attributes: {
        className: '',
        name: 'create',
      },
    },
  },
  {
    Component: CustomButton,
    data: {
      text: 'Cancel',
      attributes: {
        className: '',
        name: 'cancel',
      },
    },
  },
];
