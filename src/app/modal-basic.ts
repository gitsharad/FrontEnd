import {Component, Input,  Output, EventEmitter} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ToastrServiceService } from './toastr-service.service';
import * as _ from 'lodash';

@Component({
  selector: 'ngbd-modal-basic',
  templateUrl: './modal-basic.html',
  styles:[`.multicategory , .multilanguage {
    list-style: none;
    padding: 0;
    background: transperent;
    border: none;
    border-radius: 0;
    font-size:10px;
    margin-top:0;
    margin-bottom:0;
    list-style: none;
    padding: 0;
    border: 1px solid lightgray;
}
select{
  border-top: 0;
  border-radius: 0;
}
.customDropDown{
 background: lightgray;
 border-radius: 1px;
}
.inputli{
  width:100%;
  margin-left:0;
}
`]
})
export class NgbdModalBasic {
  closeResult: string;
  @Input() cartProduct
  @Output() updateCartProducts: EventEmitter<string>= new EventEmitter()
  public audienceList
  public industryList
  public voiceList
  public toneList
  public projectDetails
  public isDisable
  public dropdownStatusTone
  public dropdownStatusAudience
  public dropdownStatusIndustry
  public afocus
  constructor(private modalService: NgbModal, public toastr: ToastrServiceService) {
    this.audienceList = ["academics","adults","charitable","conservative","liberal","men","neutral","seniors","teens","women","young adults"]
    this.industryList = ["Automotive","Accommodation and Food Services ","Administrative and Support Services ","Administrative and Support and Waste Management and Remediation Services ","Agriculture, Forestry, Fishing and Hunting ","Air Transportation","Ambulatory Health Care Services ","Amusement, Gambling, and Recreation Industries ","Animal Production","Apparel Manufacturing ","Arts, Entertainment, and Recreation ","B","Beverage and Tobacco Product Manufacturing","Broadcasting","Building Material and Garden Equipment and Supplies Dealers ","C","Chemical Manufacturing ","Clothing and Clothing Accessories Stores ","Computer and Electronic Product Manufacturing ","Construction ","Construction of Buildings ","Couriers and Messengers ","Credit Intermediation and Related Activities ","Crop Production ","D","Data Processing, Hosting, and Related Services ","E","Education and Health Services","Educational Services ","Electrical Equipment, Appliance, and Component Manufacturing ","Electronics and Appliance Stores ","F","Fabricated Metal Product Manufacturing ","Finance and Insurance ","Financial Activities","Fishing, Hunting and Trapping ","Food Manufacturing ","Food Services and Drinking Places ","Food and Beverage Stores ","Forestry and Logging ","Funds, Trusts, and Other Financial Vehicles ","Furniture and Home Furnishings Stores ","Furniture and Related Product Manufacturing ","G","Gasoline Stations ","General Merchandise Stores ","Goods-Producing Industries","H","Health Care and Social Assistance ","Health and Personal Care Stores ","Heavy and Civil Engineering Construction ","Hospitals ","I","Information ","Insurance Carriers and Related Activities ","Internet Publishing and Broadcasting ","J","K","L","Leather and Allied Product Manufacturing ","Leisure and Hospitality","Lessors of Nonfinancial Intangible Assets","M","Machinery Manufacturing ","Management of Companies and Enterprises ","Manufacturing ","Merchant Wholesalers, Durable Goods ","Merchant Wholesalers, Nondurable Goods ","Mining (except Oil and Gas) ","Mining, Quarrying, and Oil and Gas Extraction ","Miscellaneous Manufacturing ","Miscellaneous Store Retailers ","Monetary Authorities - Central Bank ","Motion Picture and Sound Recording Industries ","Motor Vehicle and Parts Dealers ","Museums, Historical Sites, and Similar Institutions ","N","Natural Resources and Mining","Nonmetallic Mineral Product Manufacturing ","Nonstore Retailers ","Nursing and Residential Care Facilities ","O","Oil and Gas Extraction ","Other Information Services ","Other Services (except Public Administration)","P","Paper Manufacturing ","Performing Arts, Spectator Sports, and Related Industries ","Personal and Laundry Services ","Petroleum and Coal Products Manufacturing ","Pipeline Transportation ","Plastics and Rubber Products Manufacturing ","Postal Service ","Primary Metal Manufacturing ","Printing and Related Support Activities ","Private Households ","Professional and Business Services","Professional, Scientific, and Technical Services ","Publishing Industries (except Internet) ","R","Rail Transportation ","Real Estate ","Real Estate and Rental and Leasing ","Religious, Grantmaking, Civic, Professional, and Similar Organizations (NAICS 813)","Rental and Leasing Services ","Repair and Maintenance ","Retail Trade ","S","Scenic and Sightseeing Transportation ","Securities, Commodity Contracts, and Other Financial Investments and Related Activities ","Service-Providing Industries","Social Assistance ","Specialty Trade Contractors ","Sporting Goods, Hobby, Book, and Music Stores","Support Activities for Agriculture and Forestry","Support Activities for Mining ","Support Activities for Transportation ","T","Telecommunications","Textile Mills","Textile Product Mills","Trade, Transportation, and Utilities","Transit and Ground Passenger Transportation ","Transportation Equipment Manufacturing ","Transportation and Warehousing ","Truck Transportation ","U","Utilities ","V","W","Warehousing and Storage ","Waste Management and Remediation Services","Water Transportation ","Wholesale Electronic Markets and Agents and Brokers ","Wholesale Trade ","Wood Product Manufacturing"]
    this.voiceList = ["1st/2nd Person Plural"," 1st Person Plural"," 1st Person Singular"," 2nd Person Plural"," 2nd Person Singular"," 3rd Person Plural"," 3rd Person Singular"]
    this.toneList = ["anecdotal","buttoned up","charming","colloquial","comedic","conceptual","contemplative","dry","Enthusiastic/Excited","Enticing","Experimental","Formal/Professional","Free thinking","Hyperbolic & Over the top","Informal/Casual","Instructional/Educational","Inviting","Light","Neutral","No fluff","Objective/Impersonal"," Personal/Subjective","Persuasive","Plain spoken","Playful","Reserved","Satirical","Serious","Simple/Ornate","Sincere/Genuine","Smart","Sympathetic","Warm","Whimsical","Witty/Sharp"]
    this.dropdownStatusTone = false
    this.dropdownStatusAudience = false
    this.dropdownStatusIndustry = false
  }
 
  comparator(value){
    var newArray = _.find(this.cartProduct['productList'].styleGuide.tones, value.trim());
   if(newArray){
     return true
    } else {
     return  false
    }
  }

  styleCrudOperation(field,value,action,index){
    if(action === 'add'){
      this.cartProduct.styleGuide[field].push(value)
      this.changedStatus(field)
      this[field] = ""
      this.afocus = "autoFocus"
    } else if(action === 'remove'){
      this.cartProduct.styleGuide[field].splice(index,1)
    }   
  }

  addVoice(value:string){
    this.cartProduct.styleGuide.voice = value
  }

  updateCartItemStyleGuide(){
    this.updateCartProducts.emit()
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
     // console.log('result',result)
     /* if(this.validateStyleGuide() ){
            this.styleGuideStatus = this.validateStyleGuide()
            console.log(' this.styleGuideStatus', this.styleGuideStatus)
      }
      this.updateCartItemStyleGuide()
      this.styleBtnTxt = "View"
      this.closeResult = `Closed with: ${result}`; */
    }, (reason) => {
     // console.log('reason',reason)
       /* this.closeResult = `Dismissed ${this.getDismissReason(reason)}`; */
    });
  }
  saveModalData(){
   // if( this.validateStyleGuide()){
      this.cartProduct.styleGuide.styleBtnTxt = "View"
      this.toastr.Success("!","StyleGuide Saved Successfully")
      this.updateCartItemStyleGuide()
   /* } else {
      this.toastr.Error("!ohh","All * fields are mandatory")
    }
   */
  } 

  changedStatus(style){
    switch(style){
      case 'tones':
      this.dropdownStatusTone = !this.dropdownStatusTone
      break;
      case 'audiences':
      this.dropdownStatusAudience = !this.dropdownStatusAudience
      break;
      case 'industries':
       this.dropdownStatusIndustry = !this.dropdownStatusIndustry
      break;
    }
   
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


  private validateStyleGuide(){
    if(this.cartProduct.styleGuide.industries.length <= 0 || 
       this.cartProduct.styleGuide.audiences.length <= 0 || 
       this.cartProduct.styleGuide.tones.length <= 0 || 
       this.cartProduct.styleGuide.voice === "" || 
       this.cartProduct.styleGuide.keywords === "" ||
       this.cartProduct.styleGuide.thingsToMention  === "" ||
       this.cartProduct.styleGuide.additionalNotes  === "" ||
       this.cartProduct.styleGuide.thingsToMention === "" ){
      return false
    }
    else {
      return true
    }
  }
}