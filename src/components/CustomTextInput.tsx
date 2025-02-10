import React, {useEffect} from 'react';
import {Control, useController} from 'react-hook-form';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {FormTypesEnum} from '../enums/formTypes.enum';
import {Dropdown} from 'react-native-element-dropdown';

interface IProps {
  fieldType: FormTypesEnum;
  control: Control<any>;
  name: string;
  placeholder: string;
  label?: string;
  options?: any[];
  defaultValue?: any;
  numericField?: boolean;
}

const CustomFormInput = ({
  fieldType,
  control,
  name,
  placeholder,
  label,
  options,
  numericField,
}: IProps) => {
  const {
    field: {value, onChange},
    fieldState: {error},
  } = useController({
    control,
    defaultValue: '',
    name: name,
  });

  const formComponent = () => {
    switch (fieldType) {
      case FormTypesEnum.TEXT:
        return (
          <TextInput
            style={
              error
                ? {...styles.textInputBase, ...styles.textInputError}
                : {...styles.textInputBase, ...styles.textInputSafe}
            }
            placeholderTextColor={'#333333b2'}
            placeholder={placeholder}
            value={value}
            onChangeText={onChange}
            keyboardType={numericField ? 'numeric' : 'default'}
          />
        );

      case FormTypesEnum.SELECT:
        if (!options) {
          Error('Options array does not exist');
          return;
        }
        return (
          <Dropdown
            style={
              error
                ? {...styles.textInputBase, ...styles.textInputError}
                : {...styles.textInputBase, ...styles.textInputSafe}
            }
            placeholderStyle={{color: '#333333b2'}}
            data={options}
            placeholder={placeholder}
            labelField="label"
            valueField="value"
            value={value}
            onChange={(item: {label: string; value: string}) =>
              onChange(item.value)
            }
          />
        );

      default:
        break;
    }
  };

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return (
    <View>
      {label ? <Text>{label}</Text> : null}
      {formComponent()}
    </View>
  );
};

export default CustomFormInput;

const styles = StyleSheet.create({
  textInputSafe: {
    borderColor: '#333333b2',
  },

  textInputError: {
    borderColor: '#e15252',
  },

  textInputBase: {
    backgroundColor: '#f5f5f5',
    color: '#333333',
    borderColor: '#333333b2',
    fontSize: 16,
    borderWidth: 2,
    padding: 10,
    marginBottom: 16,
    borderRadius: 5,
  },
});
