import React, { useEffect, useState } from 'react';
import Select, { MultiValue } from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

interface OptionType {
  value: number;
  label: string;
}

const optionsBySection: { [key: string]: OptionType[] } = {
  'Por prioridad': [
    { value: 1, label: 'Alta' },
    { value: 2, label: 'Media' },
    { value: 3, label: 'Baja' },
  ],
  'Por estado': [
    { value: 1, label: 'Nueva' },
    { value: 2, label: 'En proceso' },
    { value: 3, label: 'Resuelta' },
    { value: 4, label: 'En espera' },
    { value: 5, label: 'Cancelada' },
  ],
  'Por colaborador': [
    { value: 17, label: 'Helmer Torres' },
    { value: 13, label: 'Cesar Fernandez' },
  ],
};

const CustomSelect: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<MultiValue<OptionType>>([]);
  const options = Object.entries(optionsBySection).map(([section, values]) => {
    return {
      label: section,
      options: values,
    };
  });

  const noOptionsMessage = () => 'No hay opciones disponibles';

  const onSubmit = () => {
    // Aquí puedes realizar la acción que desees con el estado selectedOptions
    // Por ejemplo, puedes enviar los datos seleccionados al servidor, etc.
    // eslint-disable-next-line no-console
    console.log('Opciones seleccionadas: ya se ejecuta el servicio', selectedOptions);
  };

  useEffect(() => {
    // Esta función se ejecutará cuando cambie el estado selectedOptions
    // Puedes llamar a tu función onSubmit o realizar alguna acción aquí
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