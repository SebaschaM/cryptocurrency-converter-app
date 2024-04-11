import { Typography, Box, Card, CardContent, CardActions, Button, TextField, Autocomplete, FormControl, IconButton, ToggleButton } from "@mui/material";
import { Navbar, ImageBackground } from "../components";
import useCripto from "../service/useCripto";
import { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import { useForm } from 'react-hook-form';
import { SyncAlt } from "@mui/icons-material";

interface IFormInput {
    cryptoCurrency: string;
    currency: string;
    amount: number;
}

interface ICoinInfoSelected {
    Name: string;
    FullName: string;
    ImageUrl: string;
}

const Home = () => {

    //Services
    const { getCryptocurrencies, compareCryptocurrencies } = useCripto();
    const [isLoading, setIsLoading] = useState(false);
    //Comparation
    const [comparationResult, setComparationResult] = useState(false);
    const [coinInfo, setCoinInfo] = useState<any>([]);
    const [coninInfoSelected, setCoinInfoSelected] = useState<ICoinInfoSelected>();
    const [cryptocurrencies, setCryptocurrencies] = useState([]);
    const [amount, setAmount] = useState(0);
    const [currency, setCurrency] = useState('');
    const [priceConversion, setPriceConversion] = useState(0)
    const [disableButtonCompare, setDisableButtonCompare] = useState(false);
    const [selected, setSelected] = useState(false);
    //Form
    const { register, handleSubmit } = useForm<IFormInput>();

    const handleCryptocurrencies = async () => {
        const { Data } = await getCryptocurrencies();
        const getCoinInfo = Data.map((crypto: any) => crypto.CoinInfo);
        const getNames = Data.map((crypto: any) => crypto.CoinInfo.Name);
        setCoinInfo(getCoinInfo);
        setCryptocurrencies(getNames)
    }

    const handleChangeCoinInfoSelected = async (cryptoCurrency: string) => {
        const { Name, FullName, ImageUrl } = coinInfo.find((crypto: any) => crypto.Name === cryptoCurrency);
        const coinInfoObject = {
            Name,
            FullName,
            ImageUrl
        }
        setCoinInfoSelected(coinInfoObject)
        setComparationResult(false);
        setDisableButtonCompare(false);
    }

    const handleCompareCryptocurrencies = async (data: IFormInput) => {
        handleClearForm();
        setDisableButtonCompare(true);
        setIsLoading(true);
        setComparationResult(false)
        setTimeout(async () => {
            setIsLoading(false);
            setCurrency(data.currency);
            setAmount(data.amount);
            try {
                const response = await compareCryptocurrencies(data.cryptoCurrency, data.currency);
                const { PRICE } = response.RAW[data.cryptoCurrency][data.currency]
                setPriceConversion(PRICE)
                setComparationResult(true);
            } catch (error) {
                console.log(error);
                setDisableButtonCompare(false);
            }
        }, 1500);
    }

    const handleClearForm = () => {
        setAmount(0);
        setCurrency('');
        setPriceConversion(0);
        setComparationResult(false);
    }

    useEffect(() => {
        handleCryptocurrencies();
    }, []);

    const optionMoneda = [
        { value: 'USD', label: 'Dolar Americano' },
        { value: 'EUR', label: 'Euro' },
        { value: 'GBP', label: 'Libra Esterlina' },
        { value: 'JPY', label: 'Yen Japones' },
        { value: 'CNY', label: 'Yuan Chino' },
        { value: 'KRW', label: 'Won Surcoreano' },
        { value: 'ARS', label: 'Peso Argentino' },
        { value: 'MXN', label: 'Peso Mexicano' },
        { value: 'COP', label: 'Peso Colombiano' },
        { value: 'BRL', label: 'Real Brasilero' },
        { value: 'CLP', label: 'Peso Chileno' },
        { value: 'VEF', label: 'Bolivar Venezolano' },
        { value: 'PEN', label: 'Sol Peruano' },
        { value: 'UYU', label: 'Peso Uruguayo' },
        { value: 'PYG', label: 'Guarani Paraguayo' },
        { value: 'BOB', label: 'Boliviano' },
    ]

    return (
        <>
            <Navbar />
            <ImageBackground image="https://phantom-expansion.unidadeditorial.es/02e4c549c48f5ce7df75d64294b14e74/crop/0x0/1870x1247/resize/1200/f/webp/assets/multimedia/imagenes/2021/06/28/16248635621834.jpg" />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    rowGap: '3rem',
                    marginTop: '10rem',
                }}
            >
                <Typography variant="h1" textAlign={'center'}>Conversos de criptomonedas</Typography>
                <Card sx={{
                    width: '70%',
                    backgroundColor: '#f5f5f5',
                    padding: '1.8rem',
                    borderRadius: '1rem',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                }}>

                    <CardContent>
                        <FormControl
                            component={'form'}
                            sx={{ width: '100%', display: 'flex', flexDirection: 'column', rowGap: '1rem' }}
                            onSubmit={handleSubmit(handleCompareCryptocurrencies)}
                        >
                            <Typography variant="h3" marginBottom={'1.5rem'}>Selecciona las criptomonedas que deseas comparar</Typography>

                            <TextField
                                id="outlined-basic"
                                label="Cantidad"
                                variant="outlined"
                                sx={{ width: '100%' }}
                                {...register('amount', { required: true })}
                                onChange={(_event) => {
                                    setDisableButtonCompare(false);
                                }}
                            />
                            <Box display={'flex'} columnGap={'2rem'} alignItems={'center'}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: !selected ? 'row-reverse' : 'row',
                                        width: '100%',
                                        columnGap: '2rem',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Autocomplete
                                        disableClearable
                                        id="tags-outlined"
                                        options={cryptocurrencies}
                                        fullWidth
                                        getOptionLabel={(option) => option}
                                        filterSelectedOptions
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="outlined"
                                                label="Criptomonedas"
                                                placeholder="Criptomonedas"
                                                {...register('cryptoCurrency', { required: true })}
                                            />
                                        )}
                                        onChange={(_event, value) => {
                                            handleChangeCoinInfoSelected(value)
                                        }}
                                    />
                                    <Autocomplete
                                        disableClearable
                                        id="tags-outlined"
                                        options={optionMoneda}
                                        fullWidth
                                        getOptionLabel={(option) => option.value}
                                        filterSelectedOptions
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="outlined"
                                                label="Moneda"
                                                placeholder="Moneda"
                                                {...register('currency', { required: true })}
                                            />
                                        )}
                                        onChange={(_event) => {
                                            setDisableButtonCompare(false);
                                        }}
                                    />
                                </Box>
                                <ToggleButton
                                    value="check"
                                    selected={selected}
                                    onChange={() => {
                                        setSelected(!selected);
                                    }}
                                    sx={{
                                        height: '2.5rem',
                                        width: '6rem',
                                        backgroundColor: selected ? 'rrgba(0, 0, 0, 0.08)' : '#3498DB',
                                        color: selected ? '#000000' : '#ffffff',
                                        fontWeight: selected ? 'bold' : 'normal',
                                        ':hover': {
                                            backgroundColor: selected ? 'rgba(0, 0, 0, 0.08)' : '#3498DB',
                                            color: selected ? '#000000' : '#ffffff',
                                        },
                                        ':focus': {
                                            backgroundColor: selected ? 'rgba(0, 0, 0, 0.08)' : '#3498DB',
                                            color: selected ? '#000000' : '#ffffff',
                                        }
                                    }}
                                >
                                    <SyncAlt />
                                </ToggleButton>
                            </Box>
                            <Button
                                variant="contained"
                                disabled={disableButtonCompare}
                                color="primary"
                                sx={{
                                    width: '10rem',
                                    margin: 'auto',
                                    marginTop: '1rem'
                                }}
                                fullWidth
                                type="submit"
                            >Comparar</Button>
                        </FormControl>
                    </CardContent>
                    {isLoading && (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                rowGap: '1rem',
                                marginTop: '1rem',
                            }}
                        >
                            <Loader />
                            <Typography variant="h3" textAlign={'center'}>Cargando...</Typography>
                        </Box>
                    )}
                    {comparationResult && (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                rowGap: '1rem',
                                marginTop: '1rem',
                            }}
                        >
                            <IconButton size="small">
                                <img src={`https://www.cryptocompare.com${coninInfoSelected?.ImageUrl}`} style={{ width: '2.5rem' }} alt={coninInfoSelected?.Name} />
                            </IconButton>
                            <Typography
                                variant="h3"
                                textAlign={'center'}>
                                {amount} {coninInfoSelected?.FullName} son = {(priceConversion * amount).toFixed(2)} {currency}
                            </Typography>
                        </Box>
                    )}
                </Card>
            </Box >
        </>
    );
}

export default Home;