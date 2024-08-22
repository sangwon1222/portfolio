declare type TypeMetaProps = {
  params: { id: number };
  searchParams: { [key: string]: string | string[] | undefined };
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

declare type TypeFormKeyData = "id" | "name" | "password" | "passwordRetype" | "email" | "emailCode";

declare type TypeFaqTitle = "total" | "RFIDHardware" | "beacon" | "solution";

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

declare interface ICustomBtnProps {
  clickEvent: (text?: string | undefined) => void;
  label: string;
  arg?: string | undefined;
  customCss?: string | undefined;
}

declare interface ILineTextProps {
  text: string;
  linePos: "up" | "under";
  customCss?: string | undefined;
}

declare interface IGuideProps {
  img: string;
  imgPos: "left" | "right";
  title: string;
  contents: string;
  detail: string;
}

declare type TypeFaqBoard = {
  board_no: number;
  board_type: string;
  title: string;
  question: string;
  answer: string;
  user_id: string;
  created_time: string;
  updated_time: string;
};

declare interface IBoardProps {
  title: string;
  data: TypeFaqBoard;
  showAnswer: (target: HTMLDivElement | null) => void;
}

declare interface IBoardListProps {
  title: string;
  data: TypeFaqBoard[] | [] | null;
  showAnswer: (target: HTMLDivElement | null) => void;
}

declare interface IEditMailProps {
  email: string;
  setEmail: () => void;
  sendEmail: () => void;
  resetCode: () => void;
}

declare interface IContactMailFormProps {
  companyName: string;
  position: string;
  name: string;
  email: string;
  phone: string;
  how: string;
}
