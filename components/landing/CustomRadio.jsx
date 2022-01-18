import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box, HStack } from "@chakra-ui/layout";
import { useRadio, useRadioGroup } from "@chakra-ui/radio";

// 1. Create a component that consumes the `useRadio` hook
function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="2px"
        borderRadius="md"
        _checked={{
          color: "blue.400",
          borderColor: "blue.400",
          boxShadow: "md",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={2}
        py={1}
      >
        {props.children}
      </Box>
    </Box>
  );
}

// Step 2: Use the `useRadioGroup` hook to control a group of custom radios.
function CustomRadio(props) {
  const { setTabVal } = props;
  const options = [
    { nilai: "new", name: "Rapat Baru" },
    { nilai: "all", name: "Semua Rapat" },
  ];

  const { getRootProps, getRadioProps } = useRadioGroup({
    defaultValue: "new",
    onChange: (e) => {
      setTabVal(e);
    },
  });

  const group = getRootProps();

  return (
    <HStack {...group} borderRadius="lg" w="fit-content">
      {options.map((value) => {
        const radio = getRadioProps({ value: value.nilai });
        return (
          <RadioCard key={value.nilai} {...radio}>
            {value.name}
          </RadioCard>
        );
      })}
    </HStack>
  );
}

export default CustomRadio;
