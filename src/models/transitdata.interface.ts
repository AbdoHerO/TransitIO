export interface TransitData{
    geocoded_waypoints: any[];
    routes: Route[];

}

export interface Route{
    bounds: {
        northeast: Location,
        southwest: Location
    };
    copyrights: string;
    legs: Leg[]; 
    overview_polyline:{
        points:string;
    }
}

export interface Leg{
    arrival_time:Time;
    departure_time:Time;
    distance: DistDur;
    duration: DistDur;
    end_address: string;
    end_location: Location;
    start_address: string;
    start_location:Location;
    steps: Step[];

    overview_polyline:{
        points:string
    }
}

export interface Step{
    distance:{text: string, value: number};
    duration:{text: string, value: number};
    start_location:Location;
    end_location:Location;
    html_instructions:string;
    polyline:{ 
        points:string
    };
    steps: any[];
    travel_mode:string;
    transit_details:{
        arrival_stop:Location,
        arrival_time:{
            text:string,
            time_zone:string,
            value:number
        },
        departure_stop:Location,
        departure_time:{
            text:string,
            time_zone:string,
            value:number
        },
        headsign:string,
        headway:number,
        line:Line
        num_stops:number
    }
}

export interface Location{
    lat: number;
    lng: number;
}

export interface Line{
    agencies: Agency[];
    name:string;
    short_name:string;
    vehicle:{
        icon:string,
        name:string,
        type:string
    }

}

export interface Agency{
    name:string,
    phone:string,
    url:string
}


export interface Time{
    text: string,
    time_zone: string,
    value:number
}

export interface DistDur{
    text: string;
    value: string;
}

