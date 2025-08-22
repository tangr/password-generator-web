import React, {
  useState,
  useEffect,
  FormEvent,
  useRef,
  useCallback,
} from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import {
  checkStrength,
  CheckStrengthResult,
} from '@password-generator/check-strength';
import { generatePassword } from '@password-generator/package';

import ClipboardIcon from '../../clipboard-icon.png';
import {
  Container,
  Title,
  ResultContainer,
  ResultSpan,
  ResultCopyToClipboardButton,
  Setting,
  PasswordLengthInput,
  GeneratePasswordButton,
  DefaultInitialTextInput,
  CheckBox,
  PasswordStrengthSpan,
} from './styles';

const PasswordGeneratorMain: React.FC = () => {
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] =
    useState<CheckStrengthResult | null>(null);
  const hasGeneratedInitialPassword = useRef(false);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const [preferences, setPreferences] = useState({
    initialText: '',
    passwordLength: 20,
    pronounceable: false,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
  });

  const [cachedSettings, setCachedSettings] = useState({
    ...preferences,
  });

  // Parse URL parameters and return preferences object
  const parseUrlParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const params: any = {};

    const length = urlParams.get('length');
    if (length) params.passwordLength = parseInt(length, 10);

    const initialText = urlParams.get('initialText');
    if (initialText) params.initialText = initialText;

    const pronounceable = urlParams.get('pronounceable');
    if (pronounceable) params.pronounceable = pronounceable === 'true';

    const uppercase = urlParams.get('uppercase');
    if (uppercase) params.uppercase = uppercase === 'true';

    const lowercase = urlParams.get('lowercase');
    if (lowercase) params.lowercase = lowercase === 'true';

    const numbers = urlParams.get('numbers');
    if (numbers) params.numbers = numbers === 'true';

    const symbols = urlParams.get('symbols');
    if (symbols) params.symbols = symbols === 'true';

    return params;
  };

  // Update URL parameters based on current preferences
  const updateUrlParams = useCallback((prefs: typeof preferences) => {
    const params = new URLSearchParams();

    params.set('length', prefs.passwordLength.toString());
    if (prefs.initialText) params.set('initialText', prefs.initialText);
    params.set('pronounceable', prefs.pronounceable.toString());
    params.set('uppercase', prefs.uppercase.toString());
    params.set('lowercase', prefs.lowercase.toString());
    params.set('numbers', prefs.numbers.toString());
    params.set('symbols', prefs.symbols.toString());

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, '', newUrl);
  }, []);

  // Generate password handler with useCallback
  const generatePasswordHandler = useCallback(() => {
    try {
      const passwordGenerated = generatePassword({
        length: preferences.passwordLength,
        initialText: preferences.initialText,
        useChars: {
          lowercase: preferences.lowercase,
          numbers: preferences.numbers,
          symbols: preferences.symbols,
          uppercase: preferences.uppercase,
          pronounceable: preferences.pronounceable,
        },
      });
      if (passwordGenerated) {
        setPassword(passwordGenerated);
        setPasswordStrength(checkStrength(passwordGenerated));
        updateUrlParams(preferences);
        // Auto-select the new password text
        setTimeout(() => {
          if (passwordInputRef.current) {
            passwordInputRef.current.focus();
            passwordInputRef.current.select();
          }
        }, 0);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }, [preferences, updateUrlParams]);

  // Load preferences from URL parameters on component mount
  useEffect(() => {
    const urlParams = parseUrlParams();
    if (Object.keys(urlParams).length > 0) {
      setPreferences((prevPrefs) => ({ ...prevPrefs, ...urlParams }));
    }
  }, []);

  // Auto-generate password on page load/refresh
  useEffect(() => {
    if (!hasGeneratedInitialPassword.current) {
      generatePasswordHandler();
      hasGeneratedInitialPassword.current = true;
    }
  }, [generatePasswordHandler]);

  // Auto-focus and select all text in password input on component mount
  useEffect(() => {
    if (passwordInputRef.current) {
      passwordInputRef.current.focus();
      passwordInputRef.current.select();
    }
  }, []);

  const handleCopyToClipboard = () => {
    if (password) {
      navigator.clipboard
        .writeText(password)
        .then(() => toast.success('Password was copied to your clipboard!'));
    }
  };

  const handlePasswordInputClick = () => {
    if (passwordInputRef.current) {
      passwordInputRef.current.select();
    }
  };

  const handleToogleGeneratePronunceablePassword = () => {
    if (!preferences.pronounceable) {
      setCachedSettings({
        ...preferences,
      });
      setPreferences({
        ...preferences,
        uppercase: false,
        lowercase: false,
        numbers: false,
        symbols: false,
        pronounceable: true,
      });
    } else {
      setPreferences({
        ...cachedSettings,
        passwordLength: preferences.passwordLength,
        initialText: preferences.initialText,
      });
    }
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    generatePasswordHandler();
  };

  return (
    <Container onSubmit={handleFormSubmit}>
      <Title>Password Generator</Title>

      <ResultContainer>
        <ResultSpan
          data-test-id="resultSpan"
          value={password}
          readOnly
          ref={passwordInputRef}
          onClick={handlePasswordInputClick}
        />
        <ResultCopyToClipboardButton
          type="button"
          data-test-id="clipboard"
          onClick={handleCopyToClipboard}
        >
          <img src={ClipboardIcon} alt="Copy" width={40} height={40} />
        </ResultCopyToClipboardButton>
      </ResultContainer>

      <PasswordStrengthSpan passwordPoints={passwordStrength?.points}>
        {passwordStrength?.range}
      </PasswordStrengthSpan>

      <div>
        <Setting>
          <label>Password Length</label>
          <PasswordLengthInput
            data-test-id="passwordLengthInput"
            value={preferences.passwordLength}
            onChange={(e) => {
              setPreferences({
                ...preferences,
                passwordLength: Number(e.target.value),
              });
            }}
          />
        </Setting>

        <Setting>
          <label>Add Initial Text</label>
          <DefaultInitialTextInput
            data-test-id="defaultInitialTextInput"
            value={preferences.initialText}
            onChange={(e) => {
              setPreferences({ ...preferences, initialText: e.target.value });
            }}
          />
        </Setting>

        <Setting>
          <label>Pronounceable Password</label>
          <CheckBox
            data-test-id="pronounceable"
            checked={preferences.pronounceable}
            onChange={handleToogleGeneratePronunceablePassword}
          />
        </Setting>

        <Setting>
          <label>Include Uppercase Letters</label>
          <CheckBox
            data-test-id="uppercase"
            checked={preferences.uppercase}
            onChange={() => {
              setPreferences({
                ...preferences,
                uppercase: !preferences.uppercase,
              });
            }}
            disabled={preferences.pronounceable}
          />
        </Setting>

        <Setting>
          <label>Include Lowercase Letters</label>
          <CheckBox
            data-test-id="lowercase"
            checked={preferences.lowercase}
            onChange={() => {
              setPreferences({
                ...preferences,
                lowercase: !preferences.lowercase,
              });
            }}
            disabled={preferences.pronounceable}
          />
        </Setting>

        <Setting>
          <label>Include Numbers</label>
          <CheckBox
            data-test-id="numbers"
            checked={preferences.numbers}
            onChange={() => {
              setPreferences({ ...preferences, numbers: !preferences.numbers });
            }}
            disabled={preferences.pronounceable}
          />
        </Setting>

        <Setting>
          <label>Include Symbols</label>
          <CheckBox
            data-test-id="symbols"
            checked={preferences.symbols}
            onChange={() => {
              setPreferences({ ...preferences, symbols: !preferences.symbols });
            }}
            disabled={preferences.pronounceable}
          />
        </Setting>
      </div>

      <GeneratePasswordButton
        type="submit"
        data-test-id="generatePasswordButton"
      >
        Generate Password
      </GeneratePasswordButton>
      <ToastContainer />
    </Container>
  );
};

export default PasswordGeneratorMain;
