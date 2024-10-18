import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class GoogleAddressAutocomplete implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private notifyOutputChanged: () => void;
    private searchBox: HTMLInputElement;

    private autocomplete: google.maps.places.Autocomplete;
    private value: string;
    private street: string;
    private city: string;
    private county: string;
    private state: string;
    private zipcode: string;
    private country: string;
    private latitude: number;
    private longitude: number;

    /**
     * Empty constructor.
     */
    constructor()
    {

    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement): void {
        if (typeof (context.parameters.googleapikey) === "undefined" ||
            typeof (context.parameters.googleapikey.raw) === "undefined") {
            container.innerHTML = "Please provide a valid google api key";
            return;
        }
    
        this.notifyOutputChanged = notifyOutputChanged;
    
        this.searchBox = document.createElement("input");
        this.searchBox.className = "addressAutocomplete";
        this.searchBox.addEventListener("mouseenter", this.onMouseEnter.bind(this));
        this.searchBox.addEventListener("mouseleave", this.onMouseLeave.bind(this));
    
        container.appendChild(this.searchBox);
    
        const googleApiKey = context.parameters.googleapikey.raw;
        const scriptUrl = `https://maps.googleapis.com/maps/api/js?libraries=places&language=en&key=${googleApiKey}&callback=initializeAutocomplete`;

        // Check if the Google Maps script is already included
        if (!document.querySelector(`script[src^="https://maps.googleapis.com/maps/api/js?"]`)) {
            const scriptNode = document.createElement("script");
            scriptNode.setAttribute("type", "text/javascript");
            scriptNode.setAttribute("src", scriptUrl);
            scriptNode.setAttribute("async", "true");
            document.head.appendChild(scriptNode);
    
            // Define the callback function in the global scope
            (window as any).initializeAutocomplete = this.initializeAutocomplete.bind(this);
        } else {
            // If the script is already loaded, directly initialize
            this.initializeAutocomplete();
        }
    }
    
    private initializeAutocomplete(): void {
        this.autocomplete = new google.maps.places.Autocomplete(this.searchBox, { types: ['geocode'] });
    
        // Set the fields to retrieve from the autocomplete object
        this.autocomplete.setFields(['address_components', 'geometry','formatted_address']);
    
        // When the user selects an address from the drop-down, populate the address fields in the form.
        this.autocomplete.addListener('place_changed', () => {
            const place = this.autocomplete.getPlace();
            if (place == null || place.address_components == null) {
                return;
            }
    
            this.value = "";
            this.street = "";
            this.city = "";
            this.county = "";
            this.state = "";
            this.country = "";
            this.zipcode = "";
            this.latitude = 0;
            this.longitude = 0;
    
            let streetNumber = "";
    
            place.address_components.forEach(addressComponent => {
                const componentType = addressComponent.types[0];
                const addressPiece = addressComponent.long_name;
    
                switch (componentType) {
                    case "street_number":
                        streetNumber =  addressPiece;
                        break;
                    case "route":
                        this.street =  `${streetNumber} ${addressPiece}`;
                        break;
                    case "locality":
                    case "postal_town":
                        this.city = addressPiece;
                        break;
                    case "administrative_area_level_2":
                        this.county = addressPiece;
                        break;
                    case "administrative_area_level_1":
                        this.state = addressPiece;
                        break;
                    case "country":
                        this.country = addressPiece;
                        break;
                    case "postal_code":
                        this.zipcode = addressPiece;
                        break;
                }
            });
    
            if (place.geometry) {
                this.latitude = place.geometry?.location?.lat()?? '';
                this.longitude = place.geometry?.location?.lng()?? '';
            }
    
            this.value = place.formatted_address || "";
            this.notifyOutputChanged();
        });
    }
    
    private onMouseEnter(): void {
        this.searchBox.className = "addressAutocompleteFocused";
    }

    private onMouseLeave(): void {
        this.searchBox.className = "addressAutocomplete";
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void
    {
        // Add code to update control view
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
    public getOutputs(): IOutputs
    {
        return {
            value: this.value,
            street: this.street,
            city: this.city,
            county: this.county,
            state: this.state,
            country: this.country,
            zipcode: this.zipcode,
            latitude:this.latitude,
            longitude:this.longitude
        };
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void
    {
        // Add code to cleanup control if necessary
    }
}
