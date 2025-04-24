import React from 'react';
import { SelectOption, StringOption } from '../../../../types';
import { isStringOption } from '../../../lib';

interface OptionProps {
  option: SelectOption;
}

const Option: React.FC<OptionProps> = ({ option }) => {
  if (isStringOption(option)) {
    return <option value={option}>{option}</option>;
  }

  return <option value={option.value}>{option.label}</option>;
};

export default Option;
