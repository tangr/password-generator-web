import styled from 'styled-components';

import { lighten } from 'polished';

export const Container = styled.form`
  background-color: ${(props) => props.theme.mainBlue};
  box-shadow: 0px 2px 10px ${(props) => props.theme.gray};
  padding: 18px;
  border-radius: 20px;
  width: 90%;
  max-width: 800px;
`;

export const Title = styled.h2`
  font-size: 36px;
  margin: 10px 0 20px;
  text-align: center;
`;

export const ResultContainer = styled.div`
  background-color: ${(props) => props.theme.blackBlue};
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  font-size: 18px;
  letter-spacing: 1px;
  padding: 10px 8px;
  min-height: 30px;
  width: 95%;
  gap: 8px;
`;
export const ResultSpan = styled.textarea.attrs({
  autoComplete: 'new-password',
  'data-lpignore': 'true',
  'data-form-type': 'other',
  'data-1p-ignore': 'true',
  'data-bwignore': 'true',
  'data-dashlane-rid': '',
  role: 'presentation',
  name: 'password-display-readonly',
  id: 'password-display-readonly',
  rows: 1,
})`
  background-color: ${(props) => lighten(0.1, props.theme.blackBlue)};
  color: #fff;
  font-size: 18px;
  appearance: none;
  outline: none;
  border: none;
  resize: none;
  flex: 1;
  min-width: 0;
  min-height: 30px;
  padding: 8px 4px;
  word-break: break-all;
  overflow-wrap: break-word;
  font-family: monospace;
  line-height: 1.2;
  &::selection {
    background-color: ${(props) => props.theme.gray};
  }
`;

export const PasswordStrengthSpan = styled.span.attrs((props: any) => ({
  type: 'number',
  passwordPoints: props.passwordPoints || 0,
}))`
  color: ${(props) => props.theme.blackBlue};
  font-weight: bolder;
  background-color: ${(props) => {
    let background: string;

    if (props.passwordPoints === 0) background = props.theme.mainBlue;
    else if (props.passwordPoints <= 25) background = 'red';
    else if (props.passwordPoints <= 60) background = 'yellow';
    else background = 'green';

    return background;
  }};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-size: 10px;
  letter-spacing: 1px;
  height: 15px;
`;

export const ResultCopyToClipboardButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0 solid ${(props) => props.theme.secondaryBlue};
  font-size: 20px;
  height: 40px;
  width: 40px;
  flex-shrink: 0;
  background-color: ${(props) => props.theme.secondaryBlue};
  cursor: pointer;
`;

export const PasswordLengthInput = styled.input.attrs({
  type: 'number',
  min: '5',
  max: '1024',
})`
  font-size: 18px;
  &::-webkit-inner-spin-button {
    width: 15px;
    height: 35px;
    margin: 5px;
    padding: 10px;
    transform: rotate(90deg);
    filter: sepia(100%) hue-rotate(90deg);
    cursor: pointer;
  }
`;

export const DefaultInitialTextInput = styled.input.attrs({
  type: 'text',
})`
  font-size: 18px;
  width: 100px;
`;

export const CheckBox = styled.input.attrs({
  type: 'checkbox',
})`
  position: relative;
  top: 0;
  left: 0;
  height: 19px;
  width: 19px;
  background-color: ${(props) => props.theme.ice};
  cursor: pointer;
`;

export const Setting = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
`;

export const GeneratePasswordButton = styled.button`
  border: 0 solid ${(props) => props.theme.secondaryBlue};
  background-color: ${(props) => props.theme.secondaryBlue};
  outline-color: ${(props) => props.theme.secondaryBlue};
  color: ${(props) => props.theme.white};
  padding: 10px;
  font-size: 20px;
  margin-top: 10px;
  cursor: pointer;
`;
