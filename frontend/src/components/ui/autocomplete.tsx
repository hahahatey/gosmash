"use client";

import * as React from "react";
import Select, { StylesConfig, GroupBase, Props as SelectProps } from "react-select";
import { cn } from "@/lib/utils";

interface AutocompleteOption {
  value: string | number;
  label: string;
  [key: string]: any;
}

interface AutocompleteProps<
  Option = AutocompleteOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends Omit<SelectProps<Option, IsMulti, Group>, "styles"> {
  className?: string;
  error?: boolean;
}

const customStyles: StylesConfig<any, false, GroupBase<any>> = {
  control: (base, state) => ({
    ...base,
    minHeight: "40px",
    height: "40px",
    borderRadius: "0.375rem",
    borderColor: state.isFocused
      ? "hsl(var(--ring))"
      : state.hasValue
      ? "hsl(var(--input))"
      : "hsl(var(--input))",
    backgroundColor: "hsl(var(--background))",
    boxShadow: state.isFocused
      ? "0 0 0 2px hsl(var(--ring))"
      : undefined,
    "&:hover": {
      borderColor: "hsl(var(--ring))",
    },
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "0 12px",
    height: "40px",
  }),
  input: (base) => ({
    ...base,
    margin: 0,
    padding: 0,
    color: "hsl(var(--foreground))",
  }),
  placeholder: (base) => ({
    ...base,
    color: "hsl(var(--muted-foreground))",
  }),
  singleValue: (base) => ({
    ...base,
    color: "hsl(var(--foreground))",
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "hsl(var(--accent))",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "hsl(var(--foreground))",
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "hsl(var(--foreground))",
    ":hover": {
      backgroundColor: "hsl(var(--destructive))",
      color: "hsl(var(--destructive-foreground))",
    },
  }),
  indicatorSeparator: (base) => ({
    ...base,
    backgroundColor: "hsl(var(--border))",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: "hsl(var(--muted-foreground))",
    ":hover": {
      color: "hsl(var(--foreground))",
    },
  }),
  clearIndicator: (base) => ({
    ...base,
    color: "hsl(var(--muted-foreground))",
    ":hover": {
      color: "hsl(var(--foreground))",
    },
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "hsl(var(--popover))",
    border: "1px solid hsl(var(--border))",
    borderRadius: "0.375rem",
    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  }),
  menuList: (base) => ({
    ...base,
    padding: "4px",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "hsl(var(--primary))"
      : state.isFocused
      ? "hsl(var(--accent))"
      : "transparent",
    color: state.isSelected
      ? "hsl(var(--primary-foreground))"
      : "hsl(var(--foreground))",
    cursor: "pointer",
    borderRadius: "0.25rem",
    margin: "2px 0",
    ":active": {
      backgroundColor: state.isSelected
        ? "hsl(var(--primary))"
        : "hsl(var(--accent))",
    },
  }),
  noOptionsMessage: (base) => ({
    ...base,
    color: "hsl(var(--muted-foreground))",
  }),
};

export function Autocomplete<
  Option = AutocompleteOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({ className, error, ...props }: AutocompleteProps<Option, IsMulti, Group>) {
  const errorStyles: StylesConfig<any, false, GroupBase<any>> = error
    ? {
        control: (base, state) => ({
          ...base,
          borderColor: state.isFocused
            ? "hsl(var(--destructive))"
            : "hsl(var(--destructive))",
          boxShadow: state.isFocused
            ? "0 0 0 2px hsl(var(--destructive))"
            : undefined,
        }),
      }
    : {};

  const mergedStyles = React.useMemo(
    () => ({
      ...customStyles,
      control: (base: any, state: any) => ({
        ...customStyles.control?.(base, state),
        ...errorStyles.control?.(base, state),
      }),
    }),
    [error]
  );

  const finalStyles = React.useMemo(
    () => ({
      ...mergedStyles,
      menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
    }),
    [mergedStyles]
  );

  return (
    <div className={cn("w-full", className)}>
      <Select
        {...props}
        styles={finalStyles}
        classNamePrefix="react-select"
        isSearchable
        menuPortalTarget={
          typeof document !== "undefined" ? document.body : undefined
        }
      />
    </div>
  );
}

export type { AutocompleteOption, AutocompleteProps };

