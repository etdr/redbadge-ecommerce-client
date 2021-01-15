import React from 'react';
import { Link} from 'react-router-dom';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Reviews from './../Reviews/Reviews';
import ItemDetailView from './ItemDetailView';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

type ItemProps = {
  item: any;
  key: any;
  classes: any;
  adminStatus: boolean;
  sessionToken: any;
  fetchStoreItems: any;
  updateItemId: any;
}

type ItemState = {
  storeItem: any;
  show: boolean;
  itemName: string;
  color: string;
  description: string;
  price: number;
  itemNum: number;
  imgURL: string;
  active: boolean;
  id: number;
}

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function modalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = (theme: any) => createStyles({
  root: {
    maxWidth: 345,
    flexGrow: 1,
    wrap: 'nowrap',
  },
  media: {
    height: 300,
    paddingTop: '56.25%', // 16:9
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
  },
})

class Item extends React.Component<ItemProps, ItemState> {
  constructor (props: ItemProps) {
    super(props);
      this.state = {
        // searchNodes: '',
        storeItem: [],
        show: false,
        itemName: '',
        color: '',
        description: '',
        price: 0,
        itemNum: 0,
        imgURL: '',
        active: false,
        id: 0
      }
      this.handleClick = this.handleClick.bind(this);
      this.showModal = this.showModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
  }

  setItemName = (e: any) => {
    this.setState({itemName: e.target.value});
  }

  setColor = (e: any) => {
    this.setState({color: e.target.value});
  }

  setDescription = (e: any) => {
    this.setState({description: e.target.value});
  }

  setPrice = (e: any) => {
    this.setState({price: e.target.value});
  }

  setItemNum = (e: any) => {
    this.setState({itemNum: e.target.value});
  }

  setImgURL = (e: any) => {
    this.setState({imgURL: e.target.value});
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    const url = `http://localhost:8080/listing/${this.props.item.id}`;
    const body = {
      itemName: this.state.itemName || this.props.item.itemName,
      color: this.state.color || this.props.item.color,
      description: this.state.description || this.props.item.description,
      price: this.state.price || this.props.item.price,
      itemNum: this.state.itemNum || this.props.item.itemNum,
      imgURL: this.state.imgURL || this.props.item.imgURL,
    }
  
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.props.sessionToken
      },
      body: JSON.stringify(body)
    })
      .then(r => r.json())
      .then(rObj => {
        console.log(rObj)
        this.props.fetchStoreItems()
        this.setState({ active: false }) // turn toggle off after editing item
      })
  }

  handleClick = () => {
    //   this.setState({id: this.props.itemId});
    // }
    this.props.updateItemId(this.props.item.id)
  }

  deleteListing = () => {
    fetch(`http://localhost:8080/listing/${this.props.item.id}`, {
      method: 'DELETE',
      headers: new Headers({
          'Content-Type': 'application/json',
          'Authorization': this.props.sessionToken
      })
    }) .then(() => this.props.fetchStoreItems())
  }

  showModal = () => {
    this.setState({ show: true });
  }

  closeModal = () => {
    this.setState({ show: false });
  }

  toggle = () => {
    const showEdit = this.state.active
    this.setState({active: !showEdit})
  }

  toUpperCase = (str: string) => {
    return str
    .toLowerCase()
    .split(' ')
    .map(function(word) {
        return word[0].toUpperCase() + word.substr(1);
    })
    .join(' ');
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Card className={classes.root} >
        {/* if the user is an admin, show the delete button */}
          {this.props.adminStatus ?    
            <IconButton className="deleteButton" color="inherit" aria-label="menu" style={{color: 'rgba(0, 0, 0, 0.87)', float:'right', height:'30px', width:'30px'}} 
              onClick={e =>
                      window.confirm("Are you sure you wish to delete this item?") && this.deleteListing()
              }>
              <DeleteIcon style={{height:'25px', width:'25px'}}/>
            </IconButton>
            :
            null
          }
        {/* if the user is an admin, show the edit button */}
          {this.props.adminStatus ?    
            <IconButton className="createButton" color="inherit" aria-label="menu" style={{color: 'rgba(0, 0, 0, 0.87)', float:'right', height:'30px', width:'30px'}} onClick={this.toggle}>
              <CreateIcon style={{height:'25px', width:'25px'}}/>
            </IconButton>
            :
            null
          }
          
        {/* display user edit form when create icon has been clicked, otherwise display user info */}
          {this.state.active === false ? 
            <Link to={`/listing/${this.props.item.id}`} style={{textDecoration:'none', color:'black'}}>
              <CardActionArea onClick={this.handleClick}>            
                <CardMedia
                  className="media"
                  image={require('./../../assets/' + `${this.props.item.imgURL}.jpg`).default}
                  title="furniture"
                  style={{height: 200, paddingTop: '56.25%'}}
                />
                <CardHeader
                  title={this.toUpperCase(this.props.item.itemName)}
                  style={{paddingBottom:'0'}}
                />
                <Rating id="rating" name="size-small" defaultValue={5} size="small" readOnly style={{paddingLeft:'0.7em', color:'black'}}/>
                <CardContent style={{paddingBottom:'2em', paddingTop:'0'}}>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {"$" + this.props.item.price}
                  </Typography>
                </CardContent>
                {/* <CardContent style={{paddingTop:'0'}}>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {this.toUpperCase(this.props.item.color)}
                  </Typography>
                </CardContent>
                <CardContent style={{ paddingTop:'0'}}>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {this.props.item.description}
                  </Typography>
                </CardContent> */}
              </CardActionArea>
            </Link>
          :
            <div className="paper" style={{marginTop:'0em'}}>
              <form onSubmit={this.handleSubmit} className="formEditListing" style={{ width: '70%' }} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="itemName"
                  label="Item Name"
                  name="itemName"
                  autoFocus
                  defaultValue={this.props.item.itemName}
                  onChange = {this.setItemName.bind(this)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="itemColor"
                  label="Color"
                  id="itemColor"
                  defaultValue={this.props.item.color}
                  onChange = {this.setColor.bind(this)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="itemDescription"
                  label="Description"
                  id="itemDescription"
                  defaultValue={this.props.item.description}
                  onChange = {this.setDescription.bind(this)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="itemPrice"
                  label="Price (Do not include $)"
                  id="itemPrice"
                  defaultValue={this.props.item.price}
                  onChange = {this.setPrice.bind(this)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="itemNum"
                  label="Item Number"
                  id="itemNum"
                  defaultValue={this.props.item.itemNum}
                  onChange = {this.setItemNum.bind(this)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="email"
                  label="Email"
                  id="email"
                  defaultValue={this.props.item.imgURL}
                  onChange = {this.setImgURL.bind(this)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{marginTop:"1em", marginBottom:'5em'}}
                  className="submitEdit" >
                  Edit Listing
                </Button>
              </form>
            </div>
          }
        </Card>
        
      </div>
    );
  }
}

{/* <ItemDetailView item={itemObj} key={i}/> */}
export default withStyles(styles, { withTheme: true })(Item);