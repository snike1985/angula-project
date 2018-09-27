import { Directive, Input, Output, EventEmitter } from '@angular/core';

@Directive({
    selector: '[count]'
})

export class CountoDirective {

    @Output() countoChange = new EventEmitter();
    private _timer: any;
    private _duration: number;
    private _countTo: number;
    private _countFrom: number;
    private _step: number;

    @Input()
    set duration( duration: string ) {
        this._duration = parseFloat(duration);
        this.run();
    }

    @Input()
    set countTo( countTo: string ) {
        this._countTo = parseFloat( countTo );
        this.run();
    }

    @Input()
    set countFrom( countFrom: string ) {
        this._countFrom = parseFloat( countFrom );
        this.run();
    }

    @Input()
    set step( step: string ) {

        this._step = parseFloat( step );
        this.run();
    }

    run() {

        let _this = this;

        clearInterval(_this._timer);

        if (isNaN(_this._duration)) {
            return false;
        }

        if (isNaN(_this._step)) {
            return false;
        }

        if ( isNaN( _this._countFrom ) ) {
            return false;
        }

        if ( isNaN( _this._countTo ) ) {
            return false;
        }

        if ( _this._step <= 0 ) {
            return false;
        }

        if ( _this._duration <= 0 ) {
            return false;
        }

        if ( _this._step > _this._duration * 1000 ) {
            return false;
        }

        let intermediate  = _this._countFrom,
            increment = Math.abs( _this._countTo - _this._countFrom) / ( _this._duration  / _this._step );

        _this.countoChange.emit( intermediate );

        _this._timer = setInterval( function() {

            if ( _this._countTo < _this._countFrom ) {

                if ( intermediate <= _this._countTo ) {
                    clearInterval( _this._timer );
                    _this.countoChange.emit( ( _this._countTo.toFixed(2) + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') );
                } else {
                    _this.countoChange.emit( ( intermediate.toFixed(2) + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') );
                    intermediate -= increment;
                }

            } else {

                if ( intermediate >= _this._countTo ) {
                    clearInterval( _this._timer );
                    _this.countoChange.emit( ( _this._countTo.toFixed(2) + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
                } else {
                    _this.countoChange.emit( ( intermediate.toFixed(2) + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') );
                    intermediate += increment;
                }
            }

        }, _this._step);
    }
}
