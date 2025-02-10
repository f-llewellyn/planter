import React, {useCallback, useEffect, useState} from 'react';
import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import CustomFormInput from '../components/CustomTextInput';
import {Text} from '@react-navigation/elements';
import CameraV2 from '../components/CameraV2';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {PlantFormSchema} from '../form-validation/plantForm';
import {FormTypesEnum} from '../enums/formTypes.enum';
import {sunlightOptions} from '../constants/sunligntData';
import {TPlant, TPlantFormFields} from '../types/plant.type';
import {SunlightEnum} from '../enums/sunlight.enum';
import {addPlant} from '../db/plants';
import {useDBContext} from '../utils/hooks/useDBContext.hook';

const Create = () => {
  const [isActive, setIsActive] = useState(false);
  const {db} = useDBContext();

  const navigation = useNavigation();
  const {control, handleSubmit} = useForm<TPlantFormFields>({
    resolver: zodResolver(PlantFormSchema),
  });

  const closeCamera = () => {
    setIsActive(false);
  };

  useEffect(() => {
    navigation.setOptions({headerShown: !isActive});
  }, [navigation, isActive]);

  const onSubmit = useCallback(
    async (data: TPlantFormFields) => {
      if (!db) {
        return;
      }
      try {
        const {
          name,
          summerFeedFreq,
          summerWaterFreq,
          sunlight,
          winterFeedFreq,
          winterWaterFreq,
          imageSrc,
        } = data;

        const plant: Omit<TPlant, 'id'> = {
          name,
          feedFreq: {
            summer: summerFeedFreq,
            winter: winterFeedFreq,
          },
          waterFreq: {
            summer: summerWaterFreq,
            winter: winterWaterFreq,
          },
          sunlight,
          imageSrc: imageSrc ?? '',
        };

        await addPlant(db, plant);
        navigation.navigate('Home');
      } catch (error) {
        console.error(error);
      }
    },
    [navigation, db],
  );

  return (
    <>
      {isActive ? (
        <CameraV2 isActive={isActive} closeCamera={closeCamera} />
      ) : (
        <KeyboardAvoidingView
          behavior={'padding'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
          style={styles.appView}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView>
              <TouchableHighlight
                onPress={() => setIsActive(true)}
                style={styles.imagePlaceholder}>
                <Text style={styles.icon}>
                  <FontAwesome5
                    name="camera"
                    iconStyle="solid"
                    size={32}
                    color={'#333333'}
                  />
                </Text>
              </TouchableHighlight>
              <CustomFormInput
                placeholder={'Plant Name'}
                name={'name'}
                control={control}
                fieldType={FormTypesEnum.TEXT}
              />
              <CustomFormInput
                placeholder={'Sunlight'}
                name={'sunlight'}
                control={control}
                options={sunlightOptions}
                defaultValue={SunlightEnum.FULL_SUN}
                fieldType={FormTypesEnum.SELECT}
              />

              <Text style={styles.sectionHeader}>Water Frequencey (days):</Text>
              <CustomFormInput
                placeholder={'Summer'}
                name={'summerWaterFreq'}
                control={control}
                fieldType={FormTypesEnum.TEXT}
                numericField
              />
              <CustomFormInput
                placeholder={'Winter'}
                name={'winterWaterFreq'}
                control={control}
                fieldType={FormTypesEnum.TEXT}
                numericField
              />

              <Text style={styles.sectionHeader}>Feed Frequencey (days):</Text>
              <CustomFormInput
                placeholder={'Summer'}
                name={'summerFeedFreq'}
                control={control}
                fieldType={FormTypesEnum.TEXT}
                numericField
              />
              <CustomFormInput
                placeholder={'Winter'}
                name={'winterFeedFreq'}
                control={control}
                fieldType={FormTypesEnum.TEXT}
                numericField
              />
              <Button title={'Submit'} onPress={handleSubmit(onSubmit)} />
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )}
    </>
  );
};

export default Create;

const styles = StyleSheet.create({
  appView: {
    backgroundColor: '#f8f8f8',
    height: '100%',
    padding: 24,
  },

  imagePlaceholder: {
    width: '100%',
    height: 150,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8e8e8',
    marginBottom: 16,
  },

  icon: {
    color: '#333333',
    fontSize: 24,
  },

  sectionHeader: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 8,
  },
});
