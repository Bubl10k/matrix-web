import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function MySelect({ 
    text,
    value,
    label,
    items,
    handleChange
 }) {
    return (
    <Box sx={{ 
        minWidth: 150,
     }}>
        <FormControl 
            fullWidth
        >
            <InputLabel>{ text }</InputLabel>
            <Select
                value={value}
                label={label}
                onChange={handleChange}
                sx={{
                    height: '50px',
                }}
            >
                {items.map((item, index) => {
                    return (
                        <MenuItem 
                        key={index}
                        value={item.value}
                    >
                        {item.text}
                    </MenuItem>
                    )
                })}
            </Select>
        </FormControl>
    </Box>
    )
}