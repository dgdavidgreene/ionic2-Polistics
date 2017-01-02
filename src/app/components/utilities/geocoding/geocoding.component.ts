import { Component }        from '@angular/core';
import { EmitterService }   from '../providers/emitter.service';
import { GeoCodingService }   from './geocoding.service';

@Component({
  //moduleId: module.id,
  selector: 'polistics-geocoding',
  templateUrl: 'geocoding.component.html',
  styleUrls: [ 'geocoding.component.css' ]
})

export class GeoCodingComponent {

    constructor(private geoCodingService: GeoCodingService) {
    }

    private _data: any;

    ngOnInit(){
            // Load comments
            this._data = this.requestData()
    }

    ngOnChanges(changes:any) {
        // Listen to the 'list'emitted event so as populate the model
        // with the event payload
        EmitterService.get(/*this.listId*/).subscribe((/*comments:Comment[]*/) => {/*this.comments = comments*/});
    }

    private requestData() {
        return this.geoCodingService.geoCode();
    }  
}