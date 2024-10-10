import { Paper, Stack, styled } from "@mui/material";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
}));

export default function Result({ result }) {
    return (
        <Stack direction="row" spacing={2}>
            {result.map((item, index) => {
                return (
                    <Item key={index}>
                        {item}
                    </Item>
                )
            })}
        </Stack>
    );
}