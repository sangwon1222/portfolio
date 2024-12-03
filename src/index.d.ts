declare type TypeMetaProps = {
  params: { id: number };
  searchParams: { [key: string]: string | string[] | undefined };
};

type LoadingContextType = {
  isLoading: boolean;
  setLoadingState: (v: boolean) => void;
};

declare type ThemeType = 'light' | 'dark';

declare type ThemeContextType = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

declare type ListMobileContextType = {
  open: boolean;
  setListMobile: (v: boolean) => void;
};

declare type ContactType = {
  [key: string]: string;
};

declare type TypeSignUpFormData = {
  id: string;
  name: string;
  password: string;
  passwordRetype: string;
  email: string;
  emailCode: string;
};

declare type TypeFormKeyData =
  | 'id'
  | 'name'
  | 'password'
  | 'passwordRetype'
  | 'email'
  | 'emailCode';

declare type TypeFaqTitle = 'total' | 'RFIDHardware' | 'beacon' | 'solution';

declare interface IFaqNavProps {
  changeTitle: (text: TypeFaqTitle) => void;
  title: string;
}

declare interface INavRowProps {
  to: string;
  label: string;
  isActive: boolean;
  handleMovePage: (path: string) => void;
}

declare interface IClipBoardProps {
  label?: string;
  text: string;
  copyFc: (text: string) => void;
}

declare interface ILabelInputProps {
  inputId: string;
  label: string;
  customWrapCss?: string;
  customLabelCss?: string;
  customInputWrapCss?: string;
  customInputCss?: string;
  customGuideCss?: string;
  customButtonCss?: string;
  customValidTextCss?: string;
  buttonEvent?: () => Promise<void> | void | null;
  onChangeEvent?: (value: string) => void | null;
  onEnter?: (e?: React.KeyboardEvent<HTMLInputElement>) => Promise<void> | void | null;
  validFc?: (text: string) => boolean;
  guide?: string;
  validText?: string;
  type?: string;
  buttonLabel?: string;
  placeholder?: string;
  required?: boolean;
  whiteSpace?: boolean;
  initValue?: string;
  disabled?: boolean;
}

declare interface ILineTextProps {
  text: string;
  linePos: 'up' | 'under';
  customCss?: string | undefined;
}
