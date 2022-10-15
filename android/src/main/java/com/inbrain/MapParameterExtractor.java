package com.inbrain;

import com.facebook.react.bridge.ReadableMap;

import static android.graphics.Color.parseColor;

/**
 * Extract attribute from ReadableMap and perform some validation
 * This would be SO MUCH easier with Java8
 */
abstract class MapParameterExtractor<T> {

    private ReadableMap map = null;
    private String key = null;

    public MapParameterExtractor(final ReadableMap map, String key) {
        this.map = map;
        this.key = key;
        apply();
    }


    public abstract T extractMapValue(final ReadableMap map, final String key);

    public abstract void setParam(T param);

    private void apply() {
        try {

            T value = map.hasKey(key) ? extractMapValue(this.map, this.key) : null;

            // Call Braintree sdk
            if (value != null) {
                setParam(value);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

/**
 * Boolean extractor
 */
abstract class BooleanMapParamExtractor extends MapParameterExtractor<Boolean> {
    public BooleanMapParamExtractor(ReadableMap map, String key) {
        super(map, key);
    }

    @Override
    public Boolean extractMapValue(ReadableMap map, String key) {
        return map.getBoolean(key);
    }
}

/**
 * String extractor
 */
abstract class StringMapParamExtractor extends MapParameterExtractor<String> {
    public StringMapParamExtractor(ReadableMap map, String key) {
        super(map, key);
    }

    @Override
    public String extractMapValue(ReadableMap map, String key) {
        return map.getString(key);
    }
}

/**
 * Color extractor
 */
abstract class ColorMapParamExtractor extends MapParameterExtractor<Integer> {
    public ColorMapParamExtractor(ReadableMap map, String key) {
        super(map, key);
    }

    @Override
    public Integer extractMapValue(ReadableMap map, String key) {
        return parseColor(map.getString(key));
    }
}