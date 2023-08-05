import { OptionType } from '@/src/types/Task';
import React, { useEffect, useState } from 'react';
import Select, { MultiValue } from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();


const CustomSelect = ({ onChange, users }: any) => {
  const [selectedOptions, setSelectedOptions] = useState<MultiValue<OptionType>>([]);


  const optionsBySection: { [key: string]: OptionType[] } = {
    'Por prioridad': [
      { value: 1, label: 'Alta', id: 1, type: 'priority' },
      { value: 2, label: 'Media', id: 2, type: 'priority' },
      { value: 3, label: 'Baja', id: 3, type: 'priority' },
    ],
    'Por estado': [
      { value: 4, label: 'Nueva', id: 1, type: 'state' },
      { value: 5, label: 'En proceso', id: 2, type: 'state' },
      { value: 6, label: 'Resuelta', id: 3, type: 'state' },
      { value: 7, label: 'En espera', id: 4, type: 'state' },
      { value: 8, label: 'Cancelada', id: 5, type: 'state' },
    ],
    'Por colaborador': users?.map((user: { user_id: any; user_full_name: any; }) => {
      return {
        value: user.user_id,
        label: user.user_full_name,
        id: user.user_id,
        type: 'user',
      };
    }),
  };

  const options = Object.entries(optionsBySection).map(([section, values]) => {
    return {
      label: section,
      options: values,
    };
  });

  const noOptionsMessage = () => 'No hay opciones disponibles';

  const onSubmit = () => {

    onChange(selectedOptions);
  };

  useEffect(() => {
    onSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOptions]);

  return (
    <Select
      styles={{
        control: (baseStyles, state) => {
          return {
            ...baseStyles,
            borderColor: state.isFocused ? '#FF9F24' : '#FF9F24',
            backgroundColor: 'white',
            borderRadius: 10
          };
        },
        option: (provided: any, state: any) => {
          return {
            ...provided,
            backgroundColor: state.isFocused ? '#F1F2A1FA' : 'white',
          };
        },
      }}
      theme={(theme) => {
        return {
          ...theme,
          colors: {
            ...theme.colors,
            primary: '#FF9F24',
          },
        };
      }
      }
      isMulti
      options={options}
      placeholder='Seleccione opciones...'
      noOptionsMessage={noOptionsMessage}
      components={animatedComponents}
      onChange={(selected) => setSelectedOptions(selected as OptionType[])}
    />
  );
};

export default CustomSelect;