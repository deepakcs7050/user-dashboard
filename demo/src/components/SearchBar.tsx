import type { ChangeEvent } from 'react'
import { InputAdornment, TextField } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'

type SearchBarProps = {
  value?: string
  onSearch: (value: string) => void
  placeholder?: string
  disabled?: boolean
}

const SearchBar = ({ value = '', onSearch, placeholder = 'Search tasks...', disabled = false }: SearchBarProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value)
  }

  return (
    <TextField
      fullWidth
      size="small"
      value={value}
      disabled={disabled}
      placeholder={placeholder}
      onChange={handleChange}
      sx={{
        '& .MuiOutlinedInput-root': {
          backgroundColor: 'background.paper',
          '&:hover': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main',
            },
          },
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main',
              borderWidth: 2,
            },
          },
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: 'text.secondary' }} />
          </InputAdornment>
        ),
      }}
    />
  )
}

export default SearchBar
